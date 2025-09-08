import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { CreateMeetingSchema } from 'lib/validation'
import { HTTPSTATUS } from 'lib/http-status'
import { NotFoundException, BadRequestException } from '@/lib/errors'
import { EventLocationType, IntegrationAppType } from '@prisma/client'
import { googleCalendarClient } from 'lib/oauth'
import { google } from 'googleapis'
import { withErrorHandling, withValidation } from 'lib/middleware'
import { ZodError } from 'zod'

// Helper functions remain the same
async function validateGoogleToken(
  accessToken: string,
  refreshToken: string | null,
  expiryDate: bigint | null
) {
  if (expiryDate === null || Date.now() >= Number(expiryDate)) {
    googleCalendarClient.setCredentials({
      refresh_token: refreshToken,
    })
    const { credentials } = await googleCalendarClient.refreshAccessToken()
    return credentials.access_token
  }

  return accessToken
}

async function getCalendarClient(
  appType: IntegrationAppType,
  accessToken: string,
  refreshToken: string | null,
  expiryDate: bigint | null
) {
  switch (appType) {
    case IntegrationAppType.GOOGLE_MEET_AND_CALENDAR:
      const validToken = await validateGoogleToken(
        accessToken,
        refreshToken,
        expiryDate
      )
      googleCalendarClient.setCredentials({ access_token: validToken })
      const calendar = google.calendar({
        version: "v3",
        auth: googleCalendarClient,
      })
      return {
        calendar,
        calendarType: IntegrationAppType.GOOGLE_MEET_AND_CALENDAR,
      }
    default:
      throw new BadRequestException(`Unsupported Calendar provider: ${appType}`)
  }
}

// Main handler function
async function handler(req: NextApiRequest, res: NextApiResponse, data: any) {
  if (req.method !== 'POST') {
    return res.status(HTTPSTATUS.METHOD_NOT_ALLOWED).json({
      message: 'Method not allowed'
    })
  }

  try {
    const { eventId, guestEmail, guestName, additionalInfo } = data
    const startTime = new Date(data.startTime)
    const endTime = new Date(data.endTime)

    const event = await prisma.event.findFirst({
      where: { 
        id: eventId, 
        isPrivate: false 
      },
      include: {
        user: true,
      },
    })

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    if (!Object.values(EventLocationType).includes(event.locationType)) {
      throw new BadRequestException("Invalid location type")
    }

    const meetIntegration = await prisma.integration.findFirst({
      where: {
        userId: event.user.id,
        appType: IntegrationAppType[event.locationType as keyof typeof IntegrationAppType],
      },
    })

    if (!meetIntegration) {
      throw new BadRequestException("No video conferencing integration found")
    }

    let meetLink: string = ""
    let calendarEventId: string = ""
    let calendarAppType: string = ""

    if (event.locationType === EventLocationType.GOOGLE_MEET_AND_CALENDAR) {
      const { calendarType, calendar } = await getCalendarClient(
        meetIntegration.appType,
        meetIntegration.accessToken,
        meetIntegration.refreshToken,
        meetIntegration.expiryDate
      )

      const response = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        requestBody: {
          summary: `${guestName} - ${event.title}`,
          description: additionalInfo,
          start: { dateTime: startTime.toISOString() },
          end: { dateTime: endTime.toISOString() },
          attendees: [{ email: guestEmail }, { email: event.user.email }],
          conferenceData: {
            createRequest: {
              requestId: `${event.id}-${Date.now()}`,
            },
          },
        },
      })

      meetLink = response.data.hangoutLink!
      calendarEventId = response.data.id!
      calendarAppType = calendarType
    }

    const meeting = await prisma.meeting.create({
      data: {
        eventId: event.id,
        userId: event.user.id,
        guestName,
        guestEmail,
        additionalInfo,
        startTime,
        endTime,
        meetLink,
        calendarEventId,
        calendarAppType,
      },
    })

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Meeting scheduled successfully",
      data: {
        meetLink,
        meeting,
      },
    })
  } catch (error: any) {
    console.error('Error creating meeting:', error)
    
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      return res.status(error.statusCode).json({
        message: error.message
      })
    }
    
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error'
    })
  }
}

// Export with middleware
export default withErrorHandling(
  withValidation(CreateMeetingSchema, handler)
)
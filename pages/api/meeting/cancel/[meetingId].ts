import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { MeetingIdSchema } from 'lib/validation'
import { HTTPSTATUS } from 'lib/http-status'
import { NotFoundException, BadRequestException } from '@/lib/errors'
import { MeetingStatus, IntegrationAppType } from '@prisma/client'
import { googleCalendarClient } from 'lib/oauth'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { ZodError } from 'zod'

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Only handle PUT requests
    if (req.method !== 'PUT') {
      return res.status(HTTPSTATUS.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed'
      })
    }

    // Authentication
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({ 
        message: 'Unauthorized' 
      })
    }
    const userId = session.user.id

    // Extract meetingId from query parameters
    const { meetingId } = req.query

    // Validate input
    const validation = MeetingIdSchema.safeParse({ meetingId })
    if (!validation.success) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    const validatedMeetingId = validation.data.meetingId

    const meeting = await prisma.meeting.findFirst({
      where: { 
        id: validatedMeetingId,
        userId 
      },
      include: {
        event: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!meeting) {
      throw new NotFoundException("Meeting not found")
    }

    try {
      const calendarIntegration = await prisma.integration.findFirst({
        where: {
          appType: meeting.calendarAppType as IntegrationAppType,
          userId: meeting.event.user.id,
        },
      })

      if (calendarIntegration) {
        const { calendar, calendarType } = await getCalendarClient(
          calendarIntegration.appType,
          calendarIntegration.accessToken,
          calendarIntegration.refreshToken,
          calendarIntegration.expiryDate
        )

        switch (calendarType) {
          case IntegrationAppType.GOOGLE_MEET_AND_CALENDAR:
            await calendar.events.delete({
              calendarId: "primary",
              eventId: meeting.calendarEventId,
            })
            break
          default:
            throw new BadRequestException(
              `Unsupported calendar provider: ${calendarType}`
            )
        }
      }
    } catch (error) {
      throw new BadRequestException("Failed to delete event from calendar")
    }

    await prisma.meeting.update({
      where: { id: meeting.id },
      data: { status: MeetingStatus.CANCELLED },
    })

    return res.status(HTTPSTATUS.OK).json({
      message: "Meeting cancelled successfully",
    })
  } catch (error: any) {
    console.error('Error cancelling meeting:', error)

    // Handle custom exceptions
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      return res.status(error.statusCode).json({
        message: error.message
      })
    }

    // Handle Zod errors
    if (error instanceof ZodError) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error'
    })
  }
}
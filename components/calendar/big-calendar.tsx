

"use client";

import { useState, useMemo, useEffect } from "react";
// import { addDays, setHours, setMinutes, getDay } from "date-fns";
import { useCalendarContext } from "@/components/calendar/event-calendar/calendar-context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  EventCalendar,
  type CalendarEvent,
  type EventColor,
} from "@/components/calendar/event-calendar";

export const etiquettes = [
  {
    id: "my-events",
    name: "My Events",
    color: "emerald" as EventColor,
    isActive: true,
  },
  {
    id: "marketing-team",
    name: "Marketing Team",
    color: "orange" as EventColor,
    isActive: true,
  },
  {
    id: "interviews",
    name: "Interviews",
    color: "violet" as EventColor,
    isActive: true,
  },
  {
    id: "events-planning",
    name: "Events Planning",
    color: "blue" as EventColor,
    isActive: true,
  },
  {
    id: "holidays",
    name: "Holidays",
    color: "rose" as EventColor,
    isActive: true,
  },
];

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { isColorVisible } = useCalendarContext();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Fetch meetings from API
  const { data: meetingsData, isLoading, error } = useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const response = await fetch('/api/meeting/user/all');
      if (!response.ok) throw new Error('Failed to fetch meetings');
      return response.json();
    },
    enabled: !!session,
  });

  // Map API data to CalendarEvent format
  useEffect(() => {
    if (meetingsData) {
      // Check if meetingsData is an array or has a meetings property
      const meetingsArray = Array.isArray(meetingsData) 
        ? meetingsData 
        : meetingsData.meetings || [];
      
      const mappedEvents: CalendarEvent[] = meetingsArray.map((meeting: any) => ({
        id: meeting.id,
        title: meeting.event.title || 'Untitled Meeting',
        description: meeting.additionalInfo || undefined,
        start: new Date(meeting.startTime || meeting.start || meeting.date),
        end: new Date(meeting.endTime || meeting.end || meeting.date),
        color: (meeting.color as EventColor) || 'rose',
        location: meeting.event.locationType || undefined,
        allDay: meeting.allDay || false,
        

      }));
      setEvents(mappedEvents);
    }
  }, [meetingsData]);

  const cancelMeetingMutation = useMutation({
    mutationFn: async (meetingId: string) => {
      const response = await fetch(`/api/meeting/cancel/${meetingId}`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to cancel meeting');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  const handleEventAdd = (event: CalendarEvent) => {
    // Implement API call to create new meeting
    console.log('Add event not implemented');
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    // Implement API call to update meeting
    console.log('Update event not implemented');
  };

  const handleEventDelete = (eventId: string) => {
    cancelMeetingMutation.mutate(eventId);
  };

  const visibleEvents = useMemo(() => {
    return events.filter((event) => isColorVisible(event.color));
  }, [events, isColorVisible]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading meetings: {(error as Error).message}</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <EventCalendar
      events={visibleEvents}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="week"
    />
  );
}


// "use client";

// import { useState, useMemo } from "react";
// import { addDays, setHours, setMinutes, getDay } from "date-fns";
// import { useCalendarContext } from "@/components/calendar/event-calendar/calendar-context";

// import {
//   EventCalendar,
//   type CalendarEvent,
//   type EventColor,
// } from "@/components/calendar/event-calendar";

// // Etiquettes data for calendar filtering
// export const etiquettes = [
//   {
//     id: "my-events",
//     name: "My Events",
//     color: "emerald" as EventColor,
//     isActive: true,
//   },
//   {
//     id: "marketing-team",
//     name: "Marketing Team",
//     color: "orange" as EventColor,
//     isActive: true,
//   },
//   {
//     id: "interviews",
//     name: "Interviews",
//     color: "violet" as EventColor,
//     isActive: true,
//   },
//   {
//     id: "events-planning",
//     name: "Events Planning",
//     color: "blue" as EventColor,
//     isActive: true,
//   },
//   {
//     id: "holidays",
//     name: "Holidays",
//     color: "rose" as EventColor,
//     isActive: true,
//   },
// ];

// // Function to calculate days until next Sunday
// const getDaysUntilNextSunday = (date: Date) => {
//   const day = getDay(date); // 0 is Sunday, 6 is Saturday
//   return day === 0 ? 0 : 7 - day; // If today is Sunday, return 0, otherwise calculate days until Sunday
// };

// // Store the current date to avoid repeated new Date() calls
// const currentDate = new Date();

// // Calculate the offset once to avoid repeated calculations
// const daysUntilNextSunday = getDaysUntilNextSunday(currentDate);

// // Sample events data with hardcoded times
// const sampleEvents: CalendarEvent[] = [
//   {
//     id: "w1-0a",
//     title: "Executive Board Meeting",
//     description: "Quarterly review with executive team",
//     start: setMinutes(
//       setHours(addDays(currentDate, -13 + daysUntilNextSunday), 9),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -13 + daysUntilNextSunday), 11),
//       30,
//     ),
//     color: "blue",
//     location: "Executive Boardroom",
//   },
//   {
//     id: "w1-0b",
//     title: "Investor Call",
//     description: "Update investors on company progress",
//     start: setMinutes(
//       setHours(addDays(currentDate, -13 + daysUntilNextSunday), 14),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -13 + daysUntilNextSunday), 15),
//       0,
//     ),
//     color: "violet",
//     location: "Conference Room A",
//   },
//   {
//     id: "w1-1",
//     title: "Strategy Workshop",
//     description: "Annual strategy planning session",
//     start: setMinutes(
//       setHours(addDays(currentDate, -12 + daysUntilNextSunday), 8),
//       30,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -12 + daysUntilNextSunday), 10),
//       0,
//     ),
//     color: "violet",
//     location: "Innovation Lab",
//   },
//   {
//     id: "w1-2",
//     title: "Client Presentation",
//     description: "Present quarterly results",
//     start: setMinutes(
//       setHours(addDays(currentDate, -12 + daysUntilNextSunday), 13),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -12 + daysUntilNextSunday), 14),
//       30,
//     ),
//     color: "emerald",
//     location: "Client HQ",
//   },
//   {
//     id: "w1-3",
//     title: "Budget Review",
//     description: "Review department budgets",
//     start: setMinutes(
//       setHours(addDays(currentDate, -11 + daysUntilNextSunday), 9),
//       15,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -11 + daysUntilNextSunday), 11),
//       0,
//     ),
//     color: "blue",
//     location: "Finance Room",
//   },
//   {
//     id: "w1-4",
//     title: "Team Lunch",
//     description: "Quarterly team lunch",
//     start: setMinutes(
//       setHours(addDays(currentDate, -11 + daysUntilNextSunday), 12),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -11 + daysUntilNextSunday), 13),
//       30,
//     ),
//     color: "orange",
//     location: "Bistro Garden",
//   },
//   {
//     id: "w1-5",
//     title: "Project Kickoff",
//     description: "Launch new marketing campaign",
//     start: setMinutes(
//       setHours(addDays(currentDate, -10 + daysUntilNextSunday), 10),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -10 + daysUntilNextSunday), 12),
//       0,
//     ),
//     color: "orange",
//     location: "Marketing Suite",
//   },
//   {
//     id: "w1-6",
//     title: "Interview: UX Designer",
//     description: "First round interview",
//     start: setMinutes(
//       setHours(addDays(currentDate, -10 + daysUntilNextSunday), 14),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -10 + daysUntilNextSunday), 15),
//       0,
//     ),
//     color: "violet",
//     location: "HR Office",
//   },
//   {
//     id: "w1-7",
//     title: "Company All-Hands",
//     description: "Monthly company update",
//     start: setMinutes(
//       setHours(addDays(currentDate, -9 + daysUntilNextSunday), 9),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -9 + daysUntilNextSunday), 10),
//       30,
//     ),
//     color: "emerald",
//     location: "Main Auditorium",
//   },
//   {
//     id: "w1-8",
//     title: "Product Demo",
//     description: "Demo new features to stakeholders",
//     start: setMinutes(
//       setHours(addDays(currentDate, -9 + daysUntilNextSunday), 13),
//       45,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -9 + daysUntilNextSunday), 15),
//       0,
//     ),
//     color: "blue",
//     location: "Demo Room",
//   },
//   {
//     id: "w1-9",
//     title: "Family Time",
//     description: "Morning routine with kids",
//     start: setMinutes(
//       setHours(addDays(currentDate, -8 + daysUntilNextSunday), 7),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -8 + daysUntilNextSunday), 7),
//       30,
//     ),
//     color: "rose",
//   },
//   {
//     id: "w1-10",
//     title: "Family Time",
//     description: "Breakfast with family",
//     start: setMinutes(
//       setHours(addDays(currentDate, -8 + daysUntilNextSunday), 10),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -8 + daysUntilNextSunday), 10),
//       30,
//     ),
//     color: "rose",
//   },
//   {
//     id: "5e",
//     title: "Family Time",
//     description: "Some time to spend with family",
//     start: setMinutes(
//       setHours(addDays(currentDate, -7 + daysUntilNextSunday), 10),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -7 + daysUntilNextSunday), 13),
//       30,
//     ),
//     color: "rose",
//   },
//   {
//     id: "1b",
//     title: "Meeting w/ Ely",
//     description: "Strategic planning for next year",
//     start: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 7),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 8),
//       0,
//     ),
//     color: "orange",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "1c",
//     title: "Team Catch-up",
//     description: "Weekly team sync",
//     start: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 8),
//       15,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 11),
//       0,
//     ),
//     color: "blue",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "1d",
//     title: "Checkin w/ Pedra",
//     description: "Coordinate operations",
//     start: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 15),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -6 + daysUntilNextSunday), 16),
//       0,
//     ),
//     color: "blue",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "1e",
//     title: "Teem Intro",
//     description: "Introduce team members",
//     start: setMinutes(
//       setHours(addDays(currentDate, -5 + daysUntilNextSunday), 8),
//       15,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -5 + daysUntilNextSunday), 9),
//       30,
//     ),
//     color: "emerald",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "1f",
//     title: "Task Presentation",
//     description: "Present tasks",
//     start: setMinutes(
//       setHours(addDays(currentDate, -5 + daysUntilNextSunday), 10),
//       45,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -5 + daysUntilNextSunday), 13),
//       30,
//     ),
//     color: "emerald",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "5",
//     title: "Product Meeting",
//     description: "Discuss product requirements",
//     start: setMinutes(
//       setHours(addDays(currentDate, -4 + daysUntilNextSunday), 9),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -4 + daysUntilNextSunday), 11),
//       30,
//     ),
//     color: "orange",
//     location: "Downtown Cafe",
//   },
//   {
//     id: "5b",
//     title: "Team Meeting",
//     description: "Discuss new project requirements",
//     start: setMinutes(
//       setHours(addDays(currentDate, -4 + daysUntilNextSunday), 13),
//       30,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -4 + daysUntilNextSunday), 14),
//       0,
//     ),
//     color: "violet",
//     location: "Downtown Cafe",
//   },
//   {
//     id: "5c",
//     title: "1:1 w/ Tommy",
//     description: "Talent review",
//     start: setMinutes(
//       setHours(addDays(currentDate, -3 + daysUntilNextSunday), 9),
//       45,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -3 + daysUntilNextSunday), 10),
//       45,
//     ),
//     color: "violet",
//     location: "Abbey Road Room",
//   },
//   {
//     id: "5d",
//     title: "Kick-off call",
//     description: "Ultra fast call with Sonia",
//     start: setMinutes(
//       setHours(addDays(currentDate, -3 + daysUntilNextSunday), 11),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -3 + daysUntilNextSunday), 11),
//       30,
//     ),
//     color: "violet",
//     location: "Abbey Road Room",
//   },
//   {
//     id: "5ef",
//     title: "Weekly Review",
//     description: "Manual process review",
//     start: setMinutes(
//       setHours(addDays(currentDate, -2 + daysUntilNextSunday), 8),
//       45,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -2 + daysUntilNextSunday), 9),
//       45,
//     ),
//     color: "blue",
//   },
//   {
//     id: "5f",
//     title: "Meeting w/ Mike",
//     description: "Explore new ideas",
//     start: setMinutes(
//       setHours(addDays(currentDate, -2 + daysUntilNextSunday), 14),
//       30,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -2 + daysUntilNextSunday), 15),
//       30,
//     ),
//     color: "orange",
//     location: "Main Conference Hall",
//   },
//   {
//     id: "5g",
//     title: "Family Time",
//     description: "Some time to spend with family",
//     start: setMinutes(
//       setHours(addDays(currentDate, -1 + daysUntilNextSunday), 7),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, -1 + daysUntilNextSunday), 7),
//       30,
//     ),
//     color: "rose",
//   },
//   {
//     id: "w3-1",
//     title: "Quarterly Planning",
//     description: "Plan next quarter objectives",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday), 9),
//       30,
//     ),
//     end: setMinutes(setHours(addDays(currentDate, daysUntilNextSunday), 12), 0),
//     color: "blue",
//     location: "Planning Room",
//   },
//   {
//     id: "w3-2",
//     title: "Vendor Meeting",
//     description: "Review vendor proposals",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 7),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 8),
//       30,
//     ),
//     color: "violet",
//     location: "Meeting Room B",
//   },
//   {
//     id: "w3-3",
//     title: "Design Workshop",
//     description: "Brainstorming session for new UI",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 10),
//       15,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 12),
//       45,
//     ),
//     color: "emerald",
//     location: "Design Studio",
//   },
//   {
//     id: "w3-4",
//     title: "Lunch with CEO",
//     description: "Informal discussion about company vision",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 13),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 1), 14),
//       30,
//     ),
//     color: "orange",
//     location: "Executive Dining Room",
//   },
//   {
//     id: "w3-5",
//     title: "Technical Review",
//     description: "Code review with engineering team",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 2), 11),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 2), 12),
//       30,
//     ),
//     color: "blue",
//     location: "Engineering Lab",
//   },
//   {
//     id: "w3-6",
//     title: "Customer Call",
//     description: "Follow-up with key customer",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 2), 15),
//       15,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 2), 16),
//       0,
//     ),
//     color: "violet",
//     location: "Call Center",
//   },
//   {
//     id: "w3-7",
//     title: "Team Building",
//     description: "Offsite team building activity",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 3), 9),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 3), 17),
//       0,
//     ),
//     color: "emerald",
//     location: "Adventure Park",
//     allDay: true,
//   },
//   {
//     id: "w3-8",
//     title: "Marketing Review",
//     description: "Review campaign performance",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 4), 8),
//       45,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 4), 10),
//       15,
//     ),
//     color: "orange",
//     location: "Marketing Room",
//   },
//   {
//     id: "w3-9",
//     title: "Product Roadmap",
//     description: "Discuss product roadmap for next quarter",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 5), 14),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 5), 16),
//       30,
//     ),
//     color: "blue",
//     location: "Strategy Room",
//   },
//   {
//     id: "w3-10",
//     title: "Family Time",
//     description: "Morning walk with family",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 6), 7),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 6), 7),
//       30,
//     ),
//     color: "rose",
//   },
//   {
//     id: "w3-11",
//     title: "Family Time",
//     description: "Brunch with family",
//     start: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 6), 10),
//       0,
//     ),
//     end: setMinutes(
//       setHours(addDays(currentDate, daysUntilNextSunday + 6), 10),
//       30,
//     ),
//     color: "rose",
//   },
// ];

// export default function Component() {
//   const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
//   const { isColorVisible } = useCalendarContext();

//   // Filter events based on visible colors
//   const visibleEvents = useMemo(() => {
//     return events.filter((event) => isColorVisible(event.color));
//   }, [events, isColorVisible]);

//   const handleEventAdd = (event: CalendarEvent) => {
//     setEvents([...events, event]);
//   };

//   const handleEventUpdate = (updatedEvent: CalendarEvent) => {
//     setEvents(
//       events.map((event) =>
//         event.id === updatedEvent.id ? updatedEvent : event,
//       ),
//     );
//   };

//   const handleEventDelete = (eventId: string) => {
//     setEvents(events.filter((event) => event.id !== eventId));
//   };

//   return (
//     <EventCalendar
//       events={visibleEvents}
//       onEventAdd={handleEventAdd}
//       onEventUpdate={handleEventUpdate}
//       onEventDelete={handleEventDelete}
//       initialView="week"
//     />
//   );
// }
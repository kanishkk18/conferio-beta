import { create } from 'zustand';
import { CalendarEvent, CalendarState, CalendarView, MeetingType } from 'types/calendar';
import { format } from 'date-fns';

interface CalendarActions {
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setView: (view: CalendarView) => void;
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  openEventSheet: (event?: CalendarEvent) => void;
  closeEventSheet: () => void;
  convertMeetingsToEvents: (meetings: MeetingType[]) => void;
}

type CalendarStore = CalendarState & CalendarActions;

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  currentDate: new Date(),
  selectedDate: null,
  view: 'month',
  events: [],
  isEventSheetOpen: false,
  selectedEvent: null,

  setCurrentDate: (date: Date) => set({ currentDate: date }),
  
  setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
  
  setView: (view: CalendarView) => set({ view }),
  
  setEvents: (events: CalendarEvent[]) => set({ events }),
  
  addEvent: (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    set(state => ({ events: [...state.events, newEvent] }));
  },
  
  updateEvent: (id: string, updatedEvent: Partial<CalendarEvent>) => {
    set(state => ({
      events: state.events.map(event =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    }));
  },
  
  deleteEvent: (id: string) => {
    set(state => ({
      events: state.events.filter(event => event.id !== id),
    }));
  },
  
  openEventSheet: (event?: CalendarEvent) => {
    set({ 
      isEventSheetOpen: true, 
      selectedEvent: event || null 
    });
  },
  
  closeEventSheet: () => {
    set({ 
      isEventSheetOpen: false, 
      selectedEvent: null 
    });
  },

  convertMeetingsToEvents: (meetings: MeetingType[]) => {
    const convertedEvents: CalendarEvent[] = meetings.map(meeting => ({
      id: meeting.id,
      title: meeting.event.title,
      description: meeting.event.description,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      date: format(new Date(meeting.startTime), 'yyyy-MM-dd'),
      guestName: meeting.guestName,
      guestEmail: meeting.guestEmail,
      color: '#3b82f6', // Default blue color
    }));
    
    set({ events: convertedEvents });
  },
}));
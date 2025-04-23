import { CalendarEvent, CalendarView } from './types/calendar';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface CalendarContextType {
  view: CalendarView;
  currentDate: Date;
  events: CalendarEvent[];
  setView: (view: CalendarView) => void;
  setCurrentDate: (date: Date) => void;
  dateRange: DateRange;
}

interface CalendarProviderProps {
  children: React.ReactNode;
  onDateRangeChange?: (range: DateRange) => void;
  events?: CalendarEvent[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  onDateRangeChange,
  events = [],
}) => {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  const calculateDateRange = useCallback((): DateRange => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    switch (view) {
      case 'day':
        break;
      case 'week':
        start.setDate(currentDate.getDate() - currentDate.getDay());
        end.setDate(start.getDate() + 6);
        break;
      case 'month':
        start.setDate(1);
        end.setMonth(end.getMonth() + 1);
        end.setDate(0);
        break;
    }

    return { startDate: start, endDate: end };
  }, [currentDate, view]);

  // Notifica mudanças no range de datas
  useEffect(() => {
    const dateRange = calculateDateRange();
    onDateRangeChange?.(dateRange);
  }, [currentDate, view, calculateDateRange, onDateRangeChange]);

  // Atualiza eventos quando recebe novos dados
  useEffect(() => {
    if (events.length > 0) {
      const formattedEvents = events.map((event) => ({
        ...event,
        start: event.start instanceof Date ? event.start : new Date(event.start),
        end: event.end instanceof Date ? event.end : new Date(event.end),
        status: event?.original?.status,
      }));
      setCalendarEvents(formattedEvents);
    } else {
      setCalendarEvents([]);
    }
  }, [events]);

  const contextValue = {
    view,
    currentDate,
    events: calendarEvents,
    setView,
    setCurrentDate,
    dateRange: calculateDateRange(),
  };

  return <CalendarContext.Provider value={contextValue}>{children}</CalendarContext.Provider>;
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};

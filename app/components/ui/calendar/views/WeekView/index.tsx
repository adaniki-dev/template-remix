import React from 'react';

import { useCalendar } from '../../calendarContext';
import { CalendarEvent } from '../../types/calendar';
import { getHours, getWeekDays } from '../../utils/dateHelpers';
import { calculateOverlappingEvents } from '../../utils/layoutEvents';

const calculateEventStyles = (event: CalendarEvent & { width?: string; left?: string }) => {
  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
  const height = (duration / 60) * 64;
  const startMinutes = event.start.getMinutes();
  const top = (startMinutes / 60) * 64;

  return {
    backgroundColor: event?.color,
    height: `${height}px`,
    top: `${top}px`,
    width: event.width || '95%',
    left: event.left || '2.5%',
    zIndex: 20,
    color: '#fff',
  };
};

export const WeekView = ({ EventMenu }: any) => {
  const { currentDate, events } = useCalendar();
  const weekDays = getWeekDays(currentDate);
  const hours = getHours();
  const nonRecurringEvents = events.filter((event) => !event.isRecurring);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getEventsForTimeSlot = (day: Date, hour: string) => {
    const slotEvents = nonRecurringEvents.filter((event) => {
      const eventHour = event.start.getHours();
      return isSameDay(event.start, day) && eventHour === parseInt(hour);
    });

    return calculateOverlappingEvents(slotEvents);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-[60px_1fr] border-b">
        <div className="bg-white border-r" />
        <div className="grid grid-cols-7 divide-x">
          {weekDays.map((date) => (
            <div key={date.toISOString()} className="px-2 py-1 text-center">
              <div className="text-sm font-medium">
                {date.toLocaleDateString('default', { weekday: 'short' })}
              </div>
              <div className="text-lg">{date.getDate()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[60px_1fr]">
          <div className="sticky left-0 top-0 bg-white z-10 border-r">
            {hours.map((hour) => (
              <div key={hour} className="h-16 flex items-center justify-end pr-2">
                <span className="text-xs text-gray-500 -translate-y-2">{hour}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 divide-x">
            {weekDays.map((day) => (
              <div key={day.toISOString()}>
                {hours.map((hour) => (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className="h-16 border-b relative group"
                  >
                    {getEventsForTimeSlot(day, hour).map((event) => {
                      const styles = calculateEventStyles(event);
                      return (
                        <div
                          key={event.id}
                          className="absolute group p-1 border-l-4 flex items-center justify-between border-blue-500 rounded 
                                   overflow-hidden hover:z-30 hover:shadow-lg transition-shadow"
                          style={styles}
                        >
                          <div className="text-sm font-medium truncate">{event.title}</div>
                          <div className="invisible h-min group-hover:visible">
                            {EventMenu && <EventMenu event={event} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

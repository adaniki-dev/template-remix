import React from 'react';
import { useCalendar } from '@/components/calendar/calendarContext';
import { getHours } from '@/components/calendar/utils/dateHelpers';
import { calculateOverlappingEvents } from '@/components/calendar/utils/layoutEvents';

interface DayViewProps {
  EventMenu?: React.ComponentType<any>;
}

export const DayView = ({ EventMenu }: DayViewProps) => {
  const { currentDate, events } = useCalendar();
  const hours = getHours();
  const nonRecurringEvents = events.filter((event) => !event.isRecurring);

  const getEventsForHour = (hour: string) => {
    const hourEvents = nonRecurringEvents.filter((event) => {
      const eventHour = event.start.getHours();
      return eventHour === parseInt(hour);
    });

    return calculateOverlappingEvents(hourEvents);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-1 text-center border-b">
        <div className="text-sm font-medium">
          {currentDate.toLocaleDateString('default', { weekday: 'long' })}
        </div>
        <div className="text-lg">{currentDate.getDate()}</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[60px_1fr] relative">
          <div className="sticky top-0 bg-white z-10">
            {hours.map((hour) => (
              <div key={hour} className="h-16 flex items-center justify-end pr-2">
                <span className="text-xs text-gray-500 -translate-y-2">{hour}</span>
              </div>
            ))}
          </div>

          <div className="relative border-l">
            {hours.map((hour) => {
              const hourEvents = getEventsForHour(hour);

              return (
                <div key={hour} className="h-16 border-b relative">
                  {hourEvents.map((event) => {
                    const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
                    const height = (duration / 60) * 64;
                    const startMinutes = event.start.getMinutes();
                    const top = (startMinutes / 60) * 64;

                    return (
                      <div
                        key={event.id}
                        className="absolute group flex justify-between items-center p-1 border-l-4 border-blue-500 rounded overflow-hidden"
                        style={{
                          height: `${height}px`,
                          top: `${top}px`,
                          width: event.width || '95%',
                          left: event.left || '2.5%',
                          zIndex: 20,
                          backgroundColor: event?.color,
                          color: '#fff',
                        }}
                      >
                        <div className="text-sm font-medium truncate">{event.title}</div>
                        <div className="invisible group-hover:visible">
                          {EventMenu && <EventMenu event={event} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

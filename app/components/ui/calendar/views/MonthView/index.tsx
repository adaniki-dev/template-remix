
import { useCalendar } from '../../calendarContext';

export const MonthView = ({ EventMenu, EventTooltip }: any) => {
  const { currentDate, events } = useCalendar();
  const nonRecurringEvents = events.filter((event) => !event.isRecurring);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days: Date[] = [];
    const firstDayOfWeek = firstDay.getDay();

    // Add previous month's days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push(day);
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push(day);
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6 border-t border-l">
      {days.map((date) => {
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        const dayEvents = nonRecurringEvents.filter(
          (event) => event.start.toDateString() === date.toDateString(),
        );
        return (
          <div
            key={date.toISOString()}
            className={`min-h-[100px] p-1 border-r border-b relative
              ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}
          >
            <span className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
              {date.getDate()}
            </span>
            <div className="mt-1">
            {dayEvents.map((event: any) => (
              EventTooltip && (
                <div key={event.id} className='flex items-center w-full'>
                  <EventTooltip EventMenu={EventMenu} event={event} />
                  <div className="text-xs p-1 mt-[1px] m-0 flex justify-between items-center mb-1 rounded-l-none rounded-sm truncate" style={{backgroundColor: event.color}}>
                    {EventMenu && <EventMenu event={event} />}
                  </div>
                </div>
              )
            ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

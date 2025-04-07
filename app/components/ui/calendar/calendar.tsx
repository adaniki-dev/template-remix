import { useCalendar } from '@/components/calendar/calendarContext';
import { CalendarHeader } from '@/components/calendar/calendarHeader';
import { RecurringEventsBanner } from '@/components/calendar/common/RecurringEventBanner';
import { DayView, MonthView, WeekView } from '@/components/calendar/views';

export const Calendar = ({ EventMenu, EventTooltip }: any) => {
  const { view, events } = useCalendar();

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader />
      <RecurringEventsBanner events={events} EventMenu={EventMenu} />
      {view === 'day' && <DayView EventMenu={EventMenu} />}
      {view === 'week' && <WeekView EventMenu={EventMenu} />}
      {view === 'month' && <MonthView EventMenu={EventMenu} EventTooltip={EventTooltip} />}
    </div>
  );
};

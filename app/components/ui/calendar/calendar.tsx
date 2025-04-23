import { useCalendar } from './calendarContext';
import { CalendarHeader } from './calendarHeader';
import { RecurringEventsBanner } from './common/RecurringEventBanner';
import { DayView, MonthView, WeekView } from './views';

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

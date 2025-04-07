'use client';

import { useCalendar } from '@/components/calendar/calendarContext';
import { ViewSelector } from '@/components/calendar/common/ViewSelector';
import { Button } from '@/components/ui/button';

export const CalendarHeader = () => {
  const { view, setView, currentDate, setCurrentDate } = useCalendar();

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex gap-4 items-center">
        <Button size="sm" onClick={() => setCurrentDate(new Date())}>
          Hoje
        </Button>
        <div className="flex gap-3 items-center">
          <Button onClick={handlePrevious} variant="outline" size="sm">
            ←
          </Button>
          <span
            className="font-semibold capitalize
          "
          >
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <Button onClick={handleNext} variant="outline" size="sm">
            →
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ViewSelector view={view} onChange={setView} />
      </div>
    </div>
  );
};

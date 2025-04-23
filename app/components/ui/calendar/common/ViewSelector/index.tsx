'use client';

import { CalendarView } from "../../types/calendar";


interface ViewSelectorProps {
  view: CalendarView;
  onChange: (view: CalendarView) => void;
}

const viewTranslations: Record<CalendarView, string> = {
  day: 'Dia',
  week: 'Semana',
  month: 'Mês',
};

export const ViewSelector = ({ view, onChange }: ViewSelectorProps) => {
  const views: CalendarView[] = ['day', 'week', 'month'];

  return (
    <div className="flex rounded-md shadow-sm">
      {views.map((viewOption) => (
        <button
          key={viewOption}
          onClick={() => onChange(viewOption)}
          className={`
            px-3 py-1 text-sm
            ${
              view === viewOption
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }
            ${viewOption === 'day' ? 'rounded-l-md' : ''}
            ${viewOption === 'month' ? 'rounded-r-md' : ''}
            border border-r-0 last:border-r
          `}
        >
          {viewTranslations[viewOption]}
        </button>
      ))}
    </div>
  );
};

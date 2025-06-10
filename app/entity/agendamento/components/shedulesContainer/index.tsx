'use client';
import { CalendarProvider } from '@/components/calendar/calendarContext';
import SchedulingHeader from './components/createScheduling';
import { Calendar } from '@/components/calendar/calendar';
import { CalendarEvent } from '@/components/calendar/types/calendar';
import { useMemo, useState } from 'react';
import DropdownSingleMenuScheduleDate from '@/features/agendamento/components/schedulesContainer/components/scheduleTabs/datatable/dropdownSingleMenuScheduleDate';
import { useApiQuery } from '@/core/useAPI';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import EventTooltip from '@/features/agendamento/components/schedulesContainer/components/scheduleTabs/datatable/eventTooltip';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface ApiEvent {
  id: string;
  contentsName: string;
  exactTime: string | null;
  sendDate: string | null;
  status: string;
  type: string;
  recurrence?: {
    time: string;
    daily: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    monthly: boolean;
    yearly: boolean;
  } | null;
}

interface ApiResponse {
  data: ApiEvent[];
  total: number;
  page: number;
  totalPage: number;
  perPage: number;
  orderBy: string;
}

const parseDateTime = (dateStr: string, timeStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  const [hours, minutes] = timeStr.split(':');

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  );
};

const colorStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return '#FBBF24';
    case 'processing':
      return '#3B82F6';
    case 'completed':
      return '#10B981';
    case 'failed':
      return '#EF4444';
    case 'recurrence':
      return '#8B5CF6';
    default:
      return '#2196F3';
  }
};

const transformApiDataToCalendarEvents = (apiResponse: ApiResponse): CalendarEvent[] => {
  if (!apiResponse?.data) return [];
  return apiResponse.data
    .map((event) => {
      if (event?.status === 'cancelled') return null;
      if (event.recurrence) {
        return {
          id: event.id,
          title: event.contentsName,
          start: new Date(),
          end: new Date(),
          color: colorStatus(event.status),
          status: event.status,
          isRecurring: true,
          original: event,
        };
      }

      if (!event.exactTime || !event.sendDate) return null;

      const startDate = parseDateTime(event.sendDate, event.exactTime);
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      return {
        id: event.id,
        title: event.contentsName,
        start: startDate,
        end: endDate,
        color: colorStatus(event.status),
        isRecurring: false,
        status: event.status,
        original: event,
      };
    })
    .filter(Boolean) as CalendarEvent[];
};

export default function SchedulesContainer() {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const params = useParams();

  const { data, isLoading } = useApiQuery<any>(
    [
      '/schedules/messages/search',
      `startDate=${format(dateRange?.startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(dateRange?.endDate || new Date(), 'yyyy-MM-dd')}`,
    ],
    `schedules/messages/search?campaignsId=${params.campaignsId}&startDate=${format(dateRange?.startDate || new Date(), 'yyyy-MM-dd')}&endDate=${format(dateRange?.endDate || new Date(), 'yyyy-MM-dd')}`,
    {
      enabled: !!dateRange,
    },
  );

  const events = useMemo(() => {
    if (!data && !isLoading) return [];
    if (data && data.data.length === 0) return [];
    return transformApiDataToCalendarEvents(data);
  }, [data]);

  return (
    <div className="grid w-full overflow-hidden lg:grid-rows-[56px_1fr] p-4 gap-4">
      <SchedulingHeader />
      <CalendarProvider events={events} onDateRangeChange={setDateRange}>
        <Calendar EventMenu={DropdownSingleMenuScheduleDate} EventTooltip={EventTooltip} />
      </CalendarProvider>
    </div>
  );
}

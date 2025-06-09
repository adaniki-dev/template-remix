'use client';

import Pagination from '@/components/ui/Pagination';
import { useScheduleContext } from '@/features/agendamento/context/scheduleProvider';
import { useParams } from 'next/navigation';

export default function PaginationSchedule() {
  const params = useParams();
  const { data } = useScheduleContext().querySchedule;
  return (
    <Pagination
      currentPage={data?.page || 1}
      pagesSize={data?.perPage || 25}
      totalCount={data?.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}/agendamentos`,
        flattenParams: '',
      }}
    />
  );
}

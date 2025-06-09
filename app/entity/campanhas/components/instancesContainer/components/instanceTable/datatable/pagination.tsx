'use client';

import Pagination from '@/components/ui/Pagination';
import { useCampaignsInstancesContext } from '@/features/campanhas/context/instancesContext';
import { useParams } from 'next/navigation';

export default function PaginationInstances() {
  const params = useParams();
  const { data } = useCampaignsInstancesContext().queryInstances;

  return (
    <Pagination
      currentPage={data.page || 1}
      pagesSize={data.perPage || 25}
      totalCount={data.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}/instancias`,
        flattenParams: '',
      }}
    />
  );
}

'use client';

import Pagination from '@/components/ui/Pagination';
import { useCampaignsContext } from '@/features/campanhas/context/campaignsContext';
import { useParams } from 'next/navigation';

export default function PaginationCampaigns() {
  const { data } = useCampaignsContext().queryCampains;

  const params = useParams();
  return (
    <Pagination
      currentPage={data.page || 1}
      pagesSize={data.perPage || 100}
      totalCount={data.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}`,
        flattenParams: '',
      }}
    />
  );
}

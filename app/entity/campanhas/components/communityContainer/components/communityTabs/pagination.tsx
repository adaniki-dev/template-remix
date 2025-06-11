'use client';

import Pagination from '@/components/ui/Pagination';
import { useCommunityContext } from '@/features/campanhas/context/communityContext';
import { useParams } from 'next/navigation';

export default function PaginationCommunity() {
  const params = useParams();
  const { data } = useCommunityContext().queryCommunity;
  return (
    <Pagination
      currentPage={data?.page || 1}
      pagesSize={data?.perPage || 1}
      totalCount={data?.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}/comunidade`,
        flattenParams: '',
      }}
    />
  );
}

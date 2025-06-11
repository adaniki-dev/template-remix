'use client';

import Pagination from '@/components/ui/Pagination';
import { useGroupsContext } from '@/features/campanhas/context/groupsContext';
import { useParams } from 'next/navigation';

export default function PaginationGroups() {
  const params = useParams();
  const { data } = useGroupsContext().queryGroups;
  return (
    <Pagination
      currentPage={data?.page || 1}
      pagesSize={data?.perPage || 1}
      totalCount={data?.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}/grupos`,
        flattenParams: '',
      }}
    />
  );
}

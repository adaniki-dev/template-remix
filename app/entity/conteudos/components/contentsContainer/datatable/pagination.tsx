'use client';

import Pagination from '@/components/ui/Pagination';
import { useContentsSheetProvider } from '@/modules/contents/context/contentsProvider';
import { useParams } from 'next/navigation';

export default function PaginationContents() {
  const { data } = useContentsSheetProvider().queryContents;
  const params = useParams();
  return (
    <Pagination
      currentPage={data?.page || 1}
      pagesSize={data?.perPage || 50}
      totalCount={data?.total || 0}
      typePageChange="params"
      onPageChange={{
        route: `/dashboard/campanhas/${params.campaignsId}/conteudo`,
        flattenParams: '',
      }}
    />
  );
}

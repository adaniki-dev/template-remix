'use client';

import Pagination from '@/components/ui/Pagination';

interface PaginationProps {
  perPage: number;
  page: number;
  totalCount: number;
}

export default function PaginationTicket({ perPage, page, totalCount }: PaginationProps) {
  return (
    <Pagination
      currentPage={page}
      pagesSize={perPage}
      totalCount={totalCount}
      onPageChange={{
        route: `/dashboard/tickets`,
        flattenParams: '',
      }}
    />
  );
}

'use client';

import Pagination from '@/components/ui/Pagination';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export default function PaginationRelatory({ currentPage, pageSize, totalCount }: PaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      pagesSize={pageSize}
      totalCount={totalCount}
      onPageChange={{
        route: `/dashboard/relatory`,
        flattenParams: '',
      }}
    />
  );
}

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import ButtonPaginate from './ButtonPaginate';
import IconButtonPaginate from './IconPaginate';
import usePaginate from '@/hooks/usePaginate';

interface PaginationProps {
  currentPage: number;
  onPageChange: {
    route: string;
    flattenParams: any;
  };
  pagesSize: number;
  totalCount: number;
  typePageChange?: 'route' | 'params' | 'state';
  action?: (page: string) => void;
}

export default function Pagination({
  currentPage,
  onPageChange,
  pagesSize,
  totalCount,
  typePageChange = 'route',
  action,
}: PaginationProps) {
  const siblingCount = 1;

  const paginationRange = usePaginate({
    currentPage,
    totalCount,
    siblingCount,
    pagesSize,
  });

  if (!paginationRange) return null;

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center gap-1 sm:gap-4 text-primary">
      <ButtonPaginate
        disable={Number(currentPage) === 1}
        onPageChange={onPageChange}
        page={Number(currentPage) - 1}
        typePageChange={typePageChange}
        action={action}
      >
        <HiChevronLeft className="w-4 h-4" />
        <p className="hidden sm:block">Anterior</p>
      </ButtonPaginate>
      {paginationRange.map((page, index) => {
        return (
          <div key={index}>
            {page !== 'DOTS' ? (
              <IconButtonPaginate
                currentPage={currentPage}
                onPageChange={onPageChange}
                page={Number(page)}
                index={index}
                typePageChange={typePageChange}
                action={action}
              >
                {page}
              </IconButtonPaginate>
            ) : (
              <div className="text-base text-primary">...</div>
            )}
          </div>
        );
      })}
      <ButtonPaginate
        onPageChange={onPageChange}
        page={Number(currentPage) + 1}
        disable={Number(currentPage) === lastPage}
        typePageChange={typePageChange}
        action={action}
      >
        <p className="hidden sm:block">Proximo</p>
        <HiChevronRight className="h-6" />
      </ButtonPaginate>
    </div>
  );
}

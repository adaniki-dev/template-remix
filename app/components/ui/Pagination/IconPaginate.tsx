'use client';
import { useRouter } from 'next/navigation';

interface IconButtonPaginateProps {
  currentPage: number;
  onPageChange: {
    route: string;
    flattenParams: any;
  };
  page: number;
  index: number;
  children: React.ReactNode;
  typePageChange?: 'route' | 'params' | 'state';
  action?: (page: string) => void;
}

export default function IconButtonPaginate({
  currentPage,
  onPageChange,
  page,
  children,
  typePageChange = 'route',
  action,
}: IconButtonPaginateProps) {
  const router = useRouter();
  function handlePageChange(page: number) {
    const newURLWithParams = new URLSearchParams(window.location.search);
    router.push(
      `${onPageChange.route}/${page}/${onPageChange.flattenParams}?${newURLWithParams.toString()}`,
    );
  }

  function handlePageChangeViaParams(page: number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    router.push(`${onPageChange.route}?${searchParams.toString()}`);
  }

  function handlePageChangeViaState(page: number) {
    action && action(page.toString());
  }

  function getItemProps(page: number, index: number) {
    const pageNumber = page;
    if (pageNumber === index) {
      return {
        variant: 'filled',
        className:
          'py-1 px-2 border text-white border-primary bg-primary flex items-center justify-center rounded-lg',
      } as any;
    }
    return {
      variant: 'outlined',
      className:
        'py-1 px-2 border border-primary text-primary flex items-center justify-center rounded-lg',
    } as any;
  }
  return (
    <button
      disabled={currentPage === page}
      onClick={() => {
        if (typePageChange === 'route') {
          handlePageChange(page);
        } else if (typePageChange === 'params') {
          handlePageChangeViaParams(page);
        } else {
          handlePageChangeViaState(page);
        }
      }}
      {...getItemProps(currentPage, page)}
    >
      {children}
    </button>
  );
}

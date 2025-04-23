import { useNavigate } from "@remix-run/react";
import React from "react";

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
  const navigate = useNavigate();
  function handlePageChange(page: number) {
    const newURLWithParams = new URLSearchParams(window.location.search);
    navigate(
      `${onPageChange.route}/${page}/${onPageChange.flattenParams}?${newURLWithParams.toString()}`,
    );
  }

  function handlePageChangeViaParams(page: number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    navigate(`${onPageChange.route}?${searchParams.toString()}`);
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

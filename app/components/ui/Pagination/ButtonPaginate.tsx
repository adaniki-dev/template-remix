"use client";
import { useNavigate } from "@remix-run/react";
import React from "react";

interface ButtonPaginateProps {
  onPageChange: {
    route: string;
    flattenParams: any;
  };
  page: number;
  disable: boolean;
  children: React.ReactNode;
  typePageChange?: "route" | "params" | "state";
  action?: (page: string) => void;
}

export default function ButtonPaginate({
  onPageChange,
  page,
  disable,
  children,
  typePageChange = "route",
  action,
}: ButtonPaginateProps) {
  const router = useNavigate();
  function handlePageChange(page: number) {
    const newURLWithParams = new URLSearchParams(window.location.search);
    router(
      `${onPageChange.route}/${page}/${onPageChange.flattenParams}?${newURLWithParams.toString()}`,
    );
  }

  function handlePageChangeViaParams(page: number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page.toString());
    router(`${onPageChange.route}?${searchParams.toString()}`);
  }

  function handlePageChangeViaState(page: number) {
    action && action(page.toString());
  }

  return (
    <button
      className="py-1 px-2 border border-primary flex items-center justify-center rounded-lg hover:bg-primary hover:text-white"
      disabled={disable}
      onClick={() => {
        if (typePageChange === "route") {
          handlePageChange(page);
        } else if (typePageChange === "params") {
          handlePageChangeViaParams(page);
        } else {
          handlePageChangeViaState(page);
        }
      }}
    >
      {children}
    </button>
  );
}

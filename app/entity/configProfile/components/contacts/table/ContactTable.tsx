'use client';

import { TableVirtualized } from '@/components/virtualizedTable/table';
import { useOrderProvider } from '@/features/configProfile/context/faturaContext';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function ContactTable({ columns, data }: any) {
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onClickRow(row: any) {
    return null;
  }
  return <TableVirtualized columnsLength={columns.length} table={table} onClickRow={onClickRow} />;
}

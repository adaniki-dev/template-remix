'use client';

import { TableVirtualized } from '@/components/virtualizedTable/table';
import { useOrderProvider } from '@/features/configProfile/context/faturaContext';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function OrdersTable({ columns, data }: any) {
  const { getOrderById } = useOrderProvider();
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onClickRow(row: any) {
    getOrderById(row.invoiceId);
  }
  if (!data) return null;
  return (
    <div className="mt-4">
      <TableVirtualized columnsLength={columns.length} table={table} onClickRow={onClickRow} />
    </div>
  );
}

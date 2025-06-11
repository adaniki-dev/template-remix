'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableVirtualized } from '@/components/virtualizedTable/table';

export default function DataTableGroups({ columns, data }: any) {
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="overflow-auto">
      <TableVirtualized columnsLength={columns.length} table={table} />
    </div>
  );
}

'use client';
import { TableVirtualized } from '@/components/virtualizedTable/table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function DataTableIntegrationsAdmin({ columns, data }: any) {
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="overflow-full min-h-[400px] max-h-[600px] border border-gray-300 rounded-lg p-4 relative z-10">
      <TableVirtualized columnsLength={columns?.length} table={table} />
    </div>
  );
}

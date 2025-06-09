'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableVirtualized } from '@/components/virtualizedTable/table';
import { useRouter } from 'next/navigation';

export default function DataTableChannels({ columns, data }: any) {
  const router = useRouter();
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function handleRowClick(row: any) {
    router.push(`/dashboard/canal/${row.id}/conteudo`);
  }
  return (
    <div className="overflow-auto">
      <TableVirtualized columnsLength={columns.length} table={table} onClickRow={handleRowClick} />
    </div>
  );
}

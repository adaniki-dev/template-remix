'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableVirtualized } from '@/components/virtualizedTable/table';
import { useRouter } from 'next/navigation';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function DataTableContents({ columns, data }: any) {
  const router = useRouter();
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function handleRowClick(row: any) {
    handleAddSearchParamsToUrl('ContentId', row.id);
  }

  return (
    <div className="overflow-auto">
      <TableVirtualized columnsLength={columns.length} table={table} onClickRow={handleRowClick} />
    </div>
  );
}

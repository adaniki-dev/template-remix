'use client';

import { TableVirtualized } from '@/components/virtualizedTable/table';
import { useDashboardContext } from '@/features/relatory/context/dashboardContext';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function DataTableRelatory({ columns, data }: any) {
  const { handleAddSearchParamsToUrl } = useDashboardContext();
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onClickRow(row: any) {
    handleAddSearchParamsToUrl('messageId', row.id);
  }
  return (
    <div className="mt-4">
      <TableVirtualized columnsLength={columns.length} table={table} onClickRow={onClickRow} />
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { TableVirtualized } from '@/components/virtualizedTable/table';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

export default function DataTableTicket({ columns, data }: any) {
  const router = useRouter();
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handleRowClick(row: any) {
    router.push(`/dashboard/ticket/${row.id}`);
  }

  return (
    <div className="w-full flex flex-col p-6 gap-4">
      <div className="w-full flex justify-end">
        <Button onClick={() => handleAddSearchParamsToUrl('CreateTicket', 'y')}>
          Criar Ticket
        </Button>
      </div>
      <TableVirtualized columnsLength={columns.length} table={table} onClickRow={handleRowClick} />
    </div>
  );
}

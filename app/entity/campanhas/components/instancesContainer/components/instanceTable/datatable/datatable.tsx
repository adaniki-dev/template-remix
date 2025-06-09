import { TableVirtualized } from '@/components/virtualizedTable/table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function DataTableInstancesInGroups({ columns, data }: any) {
  const table = useReactTable<any>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="overflow-auto">
      <TableVirtualized columnsLength={columns} table={table} />
    </div>
  );
}

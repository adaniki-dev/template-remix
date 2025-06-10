import { TableVirtualized } from '@/components/virtualizedTable/table';

export default function DataTableSchedule({ columns, table }: any) {
  return (
    <div className="overflow-auto w-full">
      <TableVirtualized columnsLength={columns} table={table} />
    </div>
  );
}

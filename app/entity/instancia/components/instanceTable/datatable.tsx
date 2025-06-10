'use client';
import { TableVirtualized } from '@/components/virtualizedTable/table';

export default function DataTableInstances({ columnsLength, table, onClickRow }: any) {
  return (
    <div>
      <TableVirtualized columnsLength={columnsLength} table={table} onClickRow={onClickRow} />
    </div>
  );
}

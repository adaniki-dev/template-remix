'use client';

import { ColumnDef } from '@tanstack/react-table';

export const ColumnsDetailsSchedule: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 140,
  },
];

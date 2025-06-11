'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
export const ColumnsCampaignsCsv: ColumnDef<any>[] = [
  {
    accessorKey: 'created_at',
    header: 'Data do pedido',
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'dd/MM/yyyy HH:mm'),
    enableResizing: false,
    size: 120,
  },
  {
    accessorKey: 'url',
    header: '',
    cell: ({ row }) => {
      return (
        <a className="px-2 py-1 border shadow-sm rounded-md" href={row.getValue('url')} download>
          Download
        </a>
      );
    },
    enableResizing: false,
  },
];

'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const ColumnsImportsGroupsSheet: ColumnDef<any>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          className="cursor-default"
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          checked={row.getIsSelected()}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      );
    },
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 140,
  },
  {
    accessorKey: 'size',
    header: 'Pessoas no grupo',
    cell: ({ row }) => <p>{row.getValue('size')}</p>,
    enableResizing: false,
  },
];

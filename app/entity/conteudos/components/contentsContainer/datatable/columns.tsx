'use client';

import DropdownSingleMenuContents from './dropdownSingleMenu';
import { ColumnDef } from '@tanstack/react-table';

export const ColumnsContents: ColumnDef<any>[] = [
  // {
  //   accessorKey: 'select',
  //   header: ({ table }) => {
  //     return (
  //       <Checkbox
  //         aria-label="Select all"
  //         checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Checkbox
  //         className="cursor-default"
  //         onCheckedChange={(value) => {
  //           row.toggleSelected(!!value);
  //         }}
  //         checked={row.getIsSelected()}
  //         onClick={(e) => e.stopPropagation()}
  //         aria-label="Select row"
  //       />
  //     );
  //   },
  //   minSize: 60,
  //   maxSize: 170,
  //   size: 32,
  //   enableSorting: false,
  //   enableHiding: false,
  //   enableResizing: false,
  // },
  {
    accessorKey: 'title',
    header: 'Nome',

    cell: ({ row }) => row.getValue('title'),
    size: 240,
    enableSorting: false,
    enableResizing: false,
  },
  {
    accessorKey: 'messageCount',
    header: 'Conteúdos',
    cell: ({ row }) => {
      return <p>{row.getValue('messageCount')}</p>;
    },
    enableResizing: false,
    size: 120,
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return <DropdownSingleMenuContents row={row} />;
    },
    enableResizing: false,
  },
];

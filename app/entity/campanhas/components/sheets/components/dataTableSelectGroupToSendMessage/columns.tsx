'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useGroupsToSendContentStore } from '@/features/campanhas/components/sheets/components/dataTableSelectGroupToSendMessage/useSendContentsToGroups';
import { ColumnDef } from '@tanstack/react-table';
import { MdGroups } from 'react-icons/md';

export const ColumnsGroupsSheet: ColumnDef<any>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => {
      const { handleSelectAll, getSelectedState } = useGroupsToSendContentStore();
      const selectedState = getSelectedState(table.getRowModel().rows);
      return (
        <Checkbox
          aria-label="Select all"
          checked={selectedState === 'all'}
          onCheckedChange={(checked) => handleSelectAll(table.getRowModel().rows, !!checked)}
        />
      );
    },
    cell: ({ row }) => {
      const { isChecked, onCheckedChange } = useGroupsToSendContentStore();
      return (
        <Checkbox
          className="cursor-default"
          onCheckedChange={() => onCheckedChange(row.original.id)}
          checked={isChecked(row.original.id)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      );
    },
    minSize: 60,
    maxSize: 170,
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: 'Foto',
    cell: ({ row }) => {
      if (!row.getValue('image')) {
        return (
          <div className="border-2 border-primary rounded-full w-9 h-9 flex items-center justify-center">
            <MdGroups className="text-2xl text-primary" />
          </div>
        );
      }
      return (
        <img
          src={row.getValue('image')}
          alt={row.getValue('image')}
          className="w-9 h-9 rounded-full"
        />
      );
    },
    enableResizing: false,
    size: 140,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 200,
    minSize: 100,
    maxSize: 340,
  },
];

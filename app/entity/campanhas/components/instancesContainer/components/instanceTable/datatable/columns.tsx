'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { GoPersonFill } from 'react-icons/go';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import cleanToDigits from '@/util/cleanToDigits';
import { Checkbox } from '@/components/ui/checkbox';
import DropdownHeaderMenuInstance from '@/features/campanhas/components/instancesContainer/components/instanceTable/datatable/dropdownHeaderInstance';
import DropdownSingleMenuInstances from '@/features/campanhas/components/instancesContainer/components/instanceTable/datatable/dropdownSingleInstance';
import { MdShield } from 'react-icons/md';
export const ColumnsInstancesInGroups: ColumnDef<any>[] = [
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
    size: 36,
  },
  {
    accessorKey: 'profilePicture',
    header: 'Foto',
    cell: ({ row }) => {
      if (!row.getValue('profilePicture')) {
        return (
          <div className="w-9 h-9 rounded-full bg-muted grid items-center justify-center">
            <GoPersonFill className="text-muted-foreground w-6 h-6" />
          </div>
        );
      }
      return (
        <Image
          className="rounded-full"
          src={row.getValue('profilePicture')}
          alt="Foto do perfil"
          width={36}
          height={36}
        />
      );
    },
    enableResizing: false,
    size: 80,
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ row }) => {
      if (!row.getValue('phone')) return <p>Telefone não informado</p>;
      return <p>{formatPhoneNumber(cleanToDigits(row.getValue('phone')))}</p>;
    },
    enableResizing: false,
    size: 200,
  },
  {
    accessorKey: 'instanceKey',
    header: 'Id da instancia',
    cell: ({ row }) => <p>{row.getValue('instanceKey')}</p>,
    enableResizing: false,
    size: 240,
  },
  {
    accessorKey: 'isEnabled',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            row.getValue('isEnabled') ? 'bg-green-500' : 'bg-destructive'
          }`}
        />
        <p>{row.getValue('isEnabled') ? 'Ativo' : 'Inativo'}</p>
      </div>
    ),
    enableResizing: false,
  },
  {
    accessorKey: 'isBackup',
    header: 'Contingencia',
    cell: ({ row }) => (
      <MdShield
        className={`text-2xl ${row.getValue('isBackup') ? 'text-primary' : 'text-muted'}`}
      />
    ),
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const selectedRows = table.getSelectedRowModel();
      return <DropdownHeaderMenuInstance rows={selectedRows.rows} />;
    },
    cell: ({ row }) => {
      return <DropdownSingleMenuInstances row={row} />;
    },
  },
];

'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DropdownHeaderIntegration from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance/datatable/dropdownHeaderIntegration';
import DropdownIntegration from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance/datatable/dropdownIntegration';
import { MdShield } from 'react-icons/md';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import cleanToDigits from '@/util/cleanToDigits';
import { GoPersonFill } from 'react-icons/go';
import Image from 'next/image';

export const ColumnsIntegrationInstance: ColumnDef<any>[] = [
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
    accessorKey: 'Telefone',
    header: 'Telefone',
    cell: ({ row }) => {
      if (!row.getValue('Telefone')) return <p>Telefone não informado</p>;
      return <p>{formatPhoneNumber(cleanToDigits(row.getValue('Telefone')))}</p>;
    },
    enableResizing: false,
    size: 200,
  },
  {
    accessorKey: 'key',
    header: 'Id da instancia',
    cell: ({ row }) => <p>{row.getValue('key')}</p>,
    enableResizing: false,
    size: 240,
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            row.getValue('Status') ? 'bg-green-500' : 'bg-destructive'
          }`}
        />
        <p>{row.getValue('Status') ? 'Ativo' : 'Inativo'}</p>
      </div>
    ),
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const selectedRows = table.getSelectedRowModel();
      return <DropdownHeaderIntegration rows={selectedRows.rows} />;
    },
    cell: ({ row }) => {
      return <DropdownIntegration row={row} />;
    },
    enableResizing: false,
    size: 160,
    minSize: 90,
    maxSize: 180,
  },
];

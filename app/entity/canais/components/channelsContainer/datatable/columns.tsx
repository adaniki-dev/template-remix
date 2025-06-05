'use client';

import InputFieldCopyAndPaste from '@/components/ui-modified/inputFieldCopyAndPaste';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { GoPersonFill } from 'react-icons/go';

export const ColumnsChannels: ColumnDef<any>[] = [
  {
    accessorKey: 'image',
    header: 'Foto',
    cell: ({ row }) => {
      if (!row.getValue('image')) {
        return (
          <div className="w-9 h-9 rounded-full bg-slate-200 grid items-center justify-center">
            <GoPersonFill className="text-slate-300 w-6 h-6" />
          </div>
        );
      }
      return (
        <Image
          className="rounded-full object-cover w-9 h-9"
          src={row.getValue('image')}
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
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => row.getValue('name'),
    enableResizing: false,
  },
  {
    accessorKey: 'inviteCode',
    header: 'Código de convite',
    cell: ({ row }) => {
      return (
        <InputFieldCopyAndPaste code={`https://whatsapp.com/channel/${row.original.inviteCode}`} />
      );
    },
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: 'Editar',
    cell: ({ row }) => {
      return (
        <Button
          onClick={(e) => {
            handleAddSearchParamsToUrl('EditChannels', row.original.id);
            e.stopPropagation();
          }}
          size="sm"
        >
          Editar
        </Button>
      );
    },
    enableResizing: false,
  },
];

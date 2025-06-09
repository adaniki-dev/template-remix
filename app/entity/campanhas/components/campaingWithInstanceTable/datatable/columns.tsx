'use client';

import cleanToDigits from '@/util/cleanToDigits';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { GoPersonFill } from 'react-icons/go';
export const ColumnsCampaignsInstances: ColumnDef<any>[] = [
  {
    accessorKey: 'profilePicture',
    header: 'Foto',
    cell: ({ row }) => {
      if (!row.getValue('profilePicture')) {
        return (
          <div className="w-9 h-9 rounded-full bg-slate-200 grid items-center justify-center">
            <GoPersonFill className="text-slate-300 w-6 h-6" />
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
    accessorKey: 'key',
    header: 'Id da instancia',
    cell: ({ row }) => {
      return <p>{row.original.key}</p>;
    },
    enableResizing: false,
    size: 340,
  },
  {
    accessorKey: 'isEnabled',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            row.getValue('isEnabled') ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <p>{row.getValue('isEnabled') ? 'Ativo' : 'Inativo'}</p>
      </div>
    ),
    enableResizing: false,
  },
];

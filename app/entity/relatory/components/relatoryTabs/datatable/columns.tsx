'use client';
import { Fragment } from 'react';
import formatarData from '@/util/formatDate';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const ColumnsRelatory: ColumnDef<any>[] = [
  {
    accessorKey: 'hook',
    header: 'Hook',
    cell: ({ row }) => <p>{row.getValue('hook')}</p>,
    enableResizing: false,
    size: 250,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <p>{row.getValue('status')}</p>,
    enableResizing: false,
    size: 190,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'message',
    header: 'Mensagem Enviada',
    cell: ({ row }) => {
      return (
        <p className="w-44 overflow-hidden whitespace-nowrap text-ellipsis break-all">
          {row.original.message?.text}
        </p>
      );
    },
    enableResizing: false,
    size: 340,
    minSize: 100,
    maxSize: 270,
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
    cell: ({ row }) => <p>{formatarData(row.getValue('createdAt'))}</p>,
    enableResizing: false,
    size: 200,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'integrationImage',
    header: 'Integração',
    cell: ({ row }) => (
      <Fragment>
        {!row.getValue('integrationImage') && <p>Integração não encontrada</p>}
        {row.original.integrationImage && (
          <Image
            src={row.getValue('integrationImage')}
            alt="integration logo"
            width={24}
            height={24}
          />
        )}
      </Fragment>
    ),
    enableResizing: false,
    size: 200,
    minSize: 100,
    maxSize: 340,
  },
];

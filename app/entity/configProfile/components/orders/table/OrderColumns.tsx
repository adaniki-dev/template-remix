'use client';

import { formatarBRL } from '@/util/formatCoin';
import { ColumnDef } from '@tanstack/react-table';

const dictionaryStatusProducts = (status: string) =>
  ({
    Active: 'Ativo',
    Cancelled: 'Cancelado',
    Pending: 'Aguardando Pagamento',
  })[status] || status;

export const OrderColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'invoiceId',
    header: 'N Fatura',
    cell: ({ row }) => <p>{row.getValue('invoiceId')}</p>,
    enableResizing: false,
    size: 250,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'amountOrder',
    header: 'Valor do Pedido',
    cell: ({ row }) => <p>{formatarBRL(row.getValue('amountOrder'))}</p>,
    enableResizing: false,
    size: 190,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'statusProduct',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <p className="w-44 overflow-hidden whitespace-nowrap text-ellipsis break-all">
          {dictionaryStatusProducts(row.getValue('statusProduct'))}
        </p>
      );
    },
    enableResizing: false,
    size: 340,
  },
  {
    accessorKey: 'domain',
    header: 'Instancia',
    cell: ({ row }) => {
      if (row.getValue('domain')) {
        return <p>{row.getValue('domain')}</p>;
      }
      return <p>-</p>;
    },
    enableResizing: false,
    size: 340,
  },
];

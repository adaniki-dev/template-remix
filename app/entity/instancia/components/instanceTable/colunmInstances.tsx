'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useAlertDialog } from '@/components/alertAction';
import Image from 'next/image';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { GoPersonFill } from 'react-icons/go';
import { Fragment } from 'react';
import extractWhatsAppNumbers from '@/util/extractWhatsAppNumbers';
import { useInstancesActions } from '@/features/instancia/hooks/useInstancesActions';
export type IntegrationsHooksProps = {
  id: string;
  integrationId: string;
  name: string;
  message: string;
  isEnabled: boolean;
};

export const ColumnsInstance: ColumnDef<IntegrationsHooksProps>[] = [
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
      return <p>{formatPhoneNumber(extractWhatsAppNumbers(row.getValue('phone')))}</p>;
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
            row.getValue('isEnabled') ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <p>{row.getValue('isEnabled') ? 'Ativo' : 'Inativo'}</p>
      </div>
    ),
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: 'Conectar',
    cell: ({ row }) => {
      const { deleteInstanceById } = useInstancesActions();
      const { openAlertModal } = useAlertDialog();
      return (
        <Fragment>
          {!row.getValue('isEnabled') ? (
            <button className="bg-primary text-white px-4 py-1 rounded-md">Conectar</button>
          ) : (
            <button
              className="bg-red-400 text-white px-4 py-1 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                openAlertModal({
                  title: 'Desconectar',
                  description: 'Deseja desconectar a instância?',
                  callback: async () => {
                    await deleteInstanceById({ id: row.original.id });
                  },
                });
              }}
            >
              Desconectar
            </button>
          )}
        </Fragment>
      );
    },
  },
];

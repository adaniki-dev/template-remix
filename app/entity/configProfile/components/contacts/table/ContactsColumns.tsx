'use client';

import { useAlertDialog } from '@/components/alertAction';
import { Button } from '@/components/ui/button';
import { useContactsContext } from '@/features/configProfile/context/contactsContext';
import useUsersActions from '@/features/configProfile/hooks/useUsersActions';
import { ColumnDef } from '@tanstack/react-table';

function formatarNumeroTelefone(numero: string): string {
  const regex: RegExp = /\+55(\d{2})(\d{8,9})/;

  const numeroFormatado: string = numero.replace(regex, '($1) $2');

  return numeroFormatado;
}

const dictionaryType = (type: string) =>
  ({
    phone: 'Telefone',
    email: 'Email',
  })[type] || type;

export const ContactColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => <p>{dictionaryType(row.getValue('type'))}</p>,
    enableResizing: false,
    size: 190,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'value',
    header: 'Contato',
    cell: ({ row }) => {
      if (row.getValue('type') === 'email') {
        return <p className="lowercase">{row.getValue('value')}</p>;
      }
      if (row.getValue('type') === 'phone') {
        return <p>{formatarNumeroTelefone(row.getValue('value'))}</p>;
      }
    },
    enableResizing: false,
    size: 240,
    minSize: 240,
    maxSize: 340,
  },
  {
    accessorKey: 'remove',
    header: 'Remoção',
    size: 190,
    cell: ({ row }) => {
      const { utilizeContact } = useUsersActions();
      const { queriesOptions, removeInfo } = useContactsContext();
      const { openAlertModal } = useAlertDialog();
      const { data } = queriesOptions;
      const infos = data.data;
      const newForm = removeInfo(infos, row.getValue('type'), row.getValue('value'));
      return (
        <Button
          className="bg-red-400 text-white px-4 py-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            openAlertModal({
              title: 'Remover',
              description: 'Deseja remover esse contato administrativo?',
              callback: async () => {
                await utilizeContact({
                  phones: newForm.phones,
                  emails: newForm.emails,
                });
              },
            });
          }}
        >
          Remover
        </Button>
      );
    },
  },
];

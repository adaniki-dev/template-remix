import { ColumnDef } from '@tanstack/react-table';
import ButtonSendRequestHook from './ButtonSendRequest';

export type IntegrationsHooksProps = {
  id: string;
  integrationId: string;
  name: string;
  message: string;
  isEnabled: boolean;
};

export const ColumnsIntegrationsHooksTemplate: ColumnDef<IntegrationsHooksProps>[] = [
  {
    accessorKey: 'name',
    header: 'Template de Hooks',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 300,
  },
  {
    accessorKey: 'isEnabled',
    header: '',
    cell: ({ row }) => (
      <ButtonSendRequestHook disable={!row.getValue('isEnabled')} hookId={row.original.id} />
    ),
    enableResizing: false,
  },
];

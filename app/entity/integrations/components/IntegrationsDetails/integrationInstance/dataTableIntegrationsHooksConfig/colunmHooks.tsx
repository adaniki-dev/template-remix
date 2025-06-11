import { ColumnDef } from '@tanstack/react-table';
import HookStatus from '../../hookStatus';
import { Button } from '@/components/ui/button';
import ButtonChangeStatusHook from './ButtonChangeStatus';

export type IntegrationsHooksProps = {
  id: string;
  integrationId: string;
  name: string;
  message: string;
  isEnabled: boolean;
};

export const ColumnsIntegrationsHooks: ColumnDef<IntegrationsHooksProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nome do Hooks',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 300,
  },
  {
    accessorKey: 'isEnabled',
    header: 'Status',
    cell: ({ row }) => <HookStatus status={row.getValue('isEnabled')} />,
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <ButtonChangeStatusHook status={row.original.isEnabled} hookId={row.original.id} />
          <Button>Editar</Button>
        </div>
      );
    },
  },
];

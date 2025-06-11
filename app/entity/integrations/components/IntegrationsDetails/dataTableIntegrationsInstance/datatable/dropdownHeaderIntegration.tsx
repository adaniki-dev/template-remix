'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIntegrationsActions } from '@/features/integrations/hooks/useIntegrationsActions';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DropdownHeaderIntegration({ rows }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deleteInstanceOnIntegration } = useIntegrationsActions();
  function handleDeleteInstanceOnIntegration() {
    setIsSubmitting(true);
    if (rows?.length <= 0) return toast.warning('Selecione no minimo uma instância');
    const uuids = rows.map((row: any) => row?.original?.client_integrations_instances_id);

    deleteInstanceOnIntegration(
      {
        client_integrations_instances_ids: uuids,
      },
      {
        onSuccess: () => {
          toast.success('Sua intâncias foram removidas com sucesso');
        },
        onError: () => {
          toast.error('Erro ao remover sua intância, tente novamente mais tarde');
        },
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex text-center items-center justify-center w-36 px-2 py-1 bg-primary rounded-md text-white">
          Ações em massas
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteInstanceOnIntegration();
            }}
            className="text-red-500"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

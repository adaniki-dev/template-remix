'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApiMutation } from '@/core/useAPI';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DropdownSingleMenu({ row }: any) {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const campaignsId = params.campaignsId as string;

  const deleteSchedule = useApiMutation<any, { id: string; campaignId: string }>(
    (variables) => `schedules/messages?id=${variables.id}&campaignsId=${variables.campaignId}`,
    'delete',
    {
      onSuccess: () => {
        toast.success('Agendamento excluído com sucesso');
        queryClient.invalidateQueries({
          queryKey: ['/schedules/messages/search'],
        });
      },
      onError: () => {
        toast.error('Erro ao excluir agendamento');
      },
      onSettled: () => {
        setIsDelete(false);
      },
    },
  );

  const cancelSchedule = useApiMutation<any, { campaignId: string; id: string }>(
    (variables) => `schedules/messages?id=${variables.id}&campaignsId=${variables.campaignId}`,
    'patch',
    {
      onSuccess: () => {
        toast.success('Agendamento cancelado com sucesso');
        queryClient.invalidateQueries({
          queryKey: ['/schedules/messages/search'],
        });
      },
      onError: () => {
        toast.error('Erro ao cancelar agendamento');
      },
      onSettled: () => {
        setIsCancel(false);
      },
    },
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isCancel || isDelete}
          className="flex text-center items-center justify-center w-36 px-2 py-1 bg-muted rounded-md border border-primary text-primary"
        >
          {isCancel && 'Cancelando...'}
          {isDelete && 'Excluindo...'}
          {!isCancel && !isDelete && 'Opções'}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isCancel || isDelete}
          onClick={(e) => {
            setIsCancel(true);
            cancelSchedule.mutateAsync({ id: row.original.id, campaignId: campaignsId });
          }}
        >
          Cancelar agendamento
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isCancel || isDelete}
          onClick={(e) => {
            setIsDelete(true);
            deleteSchedule.mutateAsync({ id: row.original.id, campaignId: campaignsId });
          }}
        >
          {isDelete ? 'Excluindo...' : 'Excluir agendamento'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleAddSearchParamsToUrl('ContentId', row.original.contentsId);
          }}
        >
          Conteúdo do agendamento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

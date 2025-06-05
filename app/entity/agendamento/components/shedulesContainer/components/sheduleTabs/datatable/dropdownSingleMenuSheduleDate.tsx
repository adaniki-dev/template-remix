'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApiMutation, useApiQuery } from '@/core/useAPI';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useQueryClient } from '@tanstack/react-query';
import { Ellipsis } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DropdownSingleMenuScheduleDate({ event }: any) {
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
        <button disabled={isCancel || isDelete}>
          <Ellipsis className="text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isCancel || isDelete}
          onClick={(e) => {
            setIsCancel(true);
            cancelSchedule.mutateAsync({ id: event.id, campaignId: campaignsId });
          }}
        >
          Cancelar agendamento
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isCancel || isDelete}
          onClick={(e) => {
            setIsDelete(true);
            deleteSchedule.mutateAsync({ id: event.id, campaignId: campaignsId });
          }}
        >
          {isDelete ? 'Excluindo...' : 'Excluir agendamento'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            if ('original' in event && event.original.contentsId) {
              handleAddSearchParamsToUrl('ContentId', event.original.contentsId);
            } else {
              handleAddSearchParamsToUrl('ContentId', event.contentsId);
            }
          }}
        >
          Conteúdo do agendamento
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleAddSearchParamsToUrl('shceduleId', event.original.id);
          }}
        >
          Detalhes de envio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import toast from '@/lib/Toast/toast';
import { updateTicketByIdClient } from '@/features/authSupport/services/client/updateStatusTicket';
import { useTicketByIdContext } from '@/features/authSupport/context/ticketIdContext';
import { useQueryClient } from '@tanstack/react-query';
import { getStatusDetails } from '@/features/authSupport/components/tickedId/utils/getStatusDetails';
import { useApiMutation } from '@/core/useAPI';

export default function DropDownChangeStatus() {
  const { queryTicketById } = useTicketByIdContext();
  const queryClient = useQueryClient();
  const data = queryTicketById?.data;
  const ticketId = data?.ticketid;
  const status = getStatusDetails(data?.status);
  const statusLabel = status?.name;
  const loading = toast.loading('Alterando status...');

  const updateStatus = useApiMutation<any, {data:any, id: string}>(
    (variables) => `tickets/${variables?.id}`, "put",
    {
      onSuccess: async (_data) => {
        await queryClient.invalidateQueries({
          queryKey: ['ticketsById'],
          refetchType: 'all',
        });
        toast.success('Status alterado com sucesso!', { id: loading });
      },
      onError: () => {
        toast.error('Erro ao alterar status!', { id: loading });
      },
      onSettled: () => {
        toast.dismiss(loading);
      },
    },
  )

  const handleStatus = async (newStatus: string) => {
    const body = {
      status: newStatus,
    };
    updateStatus.mutateAsync(
      {
        data: body,
        id: ticketId
      }
    )
  };
  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex justify-center items-center">
          <button className={`${status?.color} shadow-lg rounded-md p-2 text-xs`} type="button">
            {statusLabel}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2">
          <DropdownMenuItem onClick={() => handleStatus('Open')}>Aberto</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatus('Customer-Reply')}>
            Resposta do cliente
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatus('Answered')}>Respondido</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatus('Closed')}>Fechado</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

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
import { useApiMutation } from '@/core/useAPI';
import { deleteTicket } from '@/features/authSupport/services/client/deleteTicket';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DropdownHeaderTicket({ rows }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const loading = toast.loading('Excluindo tickets...');
  const deleteTicket = useApiMutation<any, {id: string}>(
    (variable) => `tickets/${variable.id}`,
    "delete",
    {
      onSuccess: async () => {
        toast.success('Tickets excluídos com sucesso!', { id: loading });
        await queryClient.invalidateQueries({
          queryKey: ['tickets'],
          refetchType: 'all',
        });
      },
      onError: () => {
        toast.error('Erro ao excluir tickets!', { id: loading });
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    },
  )

  function handleDelete() {
    setIsSubmitting(true);
    if (rows?.length <= 0) return toast.warning('Selecione no minimo um ticket');
    const deletePromises = rows.map((row: any) => deleteTicket.mutateAsync(
      {id: row.original.id}
    ))
    return Promise.all(deletePromises);

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
              handleDelete();
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

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
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteTicket } from '../../../services/client/deleteTicket';
import { useApiMutation } from '@/core/useAPI';

export default function DropdownTicket({ row }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const loading = toast.loading('Excluindo ticket...');
  const deleteTicket = useApiMutation<any, {id: string}>(
    (variable) => `tickets/${variable.id}`, 
    "delete",
    {
      onSuccess: async () => {
        toast.success('Ticket excluída com sucesso!', { id: loading });
        await queryClient.invalidateQueries({
          queryKey: ['tickets'],
          refetchType: 'all',
        });
      },
      onError: () => {
        toast.error('Erro ao excluir ticket!', { id: loading });
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    },
  )
  function handleDelete() {
    setIsSubmitting(true);
    deleteTicket.mutateAsync(
      {id: row.original.id}
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex text-center items-center justify-center w-36 px-2 py-1 rounded-md border border-primary text-primary">
          Opções
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

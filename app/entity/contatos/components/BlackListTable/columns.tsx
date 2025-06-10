'use client';
import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/core/useAPI';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2, Variable } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const ColumnsBlackList: ColumnDef<any>[] = [
  {
    accessorKey: 'phone',
    header: 'Nome',
    cell: ({ row }) => formatPhoneNumber(row.getValue('phone')),
    size: 240,
    enableSorting: false,
    enableResizing: false,
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
    cell: ({ row }) => {
      return row.getValue('reason') !== '' ? row.getValue('reason') : 'Sem motivo';
    },
    size: 240,
    enableSorting: false,
    enableResizing: false,
  },
  {
    accessorKey: 'actions',
    header: 'Remover',
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const [isSubmitting, setIsSubmitting] = useState(false);
      const removeBlackList = useApiMutation<any, { id: string }>(
        (variable) => `/blacklist?id=${variable.id}`,
        'delete',
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['/blacklist'],
            });
            toast.success('Removido com sucesso');
          },
          onError: () => {
            toast.error('Erro ao remover da black list');
          },
        },
      );
      async function handleRemove() {
        setIsSubmitting(true);
        await removeBlackList.mutateAsync(
          { id: row.original.id },
          { onSettled: () => setIsSubmitting(false) },
        );
      }
      return (
        <Button disabled={isSubmitting} onClick={() => handleRemove()} variant="destructive">
          <Trash2 />
        </Button>
      );
    },
    enableSorting: false,
    enableResizing: false,
  },
];

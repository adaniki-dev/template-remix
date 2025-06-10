'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AiOutlineLoading } from 'react-icons/ai';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { useApiMutation } from '@/core/useAPI';
import { useAlertDialog } from '@/components/alertAction';
import { useCollectionStore } from '@/modules/contents/sendContent/hook/useColletionStore';

export default function DropdownSingleMenuContents({ row }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingSend, setIsSubmittingSend] = useState(false);
  const queryClient = useQueryClient();
  const { openAlertModal } = useAlertDialog();
  const { setContent } = useCollectionStore();

  const deleteContentsById = useApiMutation<any, { id: string }>(
    (variables) => `/contents?id=${variables.id}`,
    'delete',
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['contents'],
        });
        toast.success('Conteúdo excluído com sucesso!');
      },
      onError: () => {
        toast.error('Desculpe, ocorreu um erro ao excluir o conteúdo!');
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    },
  );

  const sendMessage = useApiMutation<
    any,
    { contentsId: string; campaignsId: string; allGroups: boolean }
  >('/contents/send', 'post', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['contents'],
      });
      toast.success('Conteúdo enviada com sucesso!');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao enviar o conteúdo!');
    },
    onSettled: () => {
      setIsSubmittingSend(false);
    },
  });

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={isSubmitting} variant="outline">
            {isSubmitting && <AiOutlineLoading className="animate-spin mr-2" />}
            {!isSubmitting ? 'Ações' : 'Excluindo...'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={isSubmitting}
              onClick={(e) => {
                e.stopPropagation();
                setContent(row.original);
                handleAddSearchParamsToUrl('contentMode', 'y');
              }}
            >
              Agendar ou enviar Conteúdos
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSubmitting}
              onClick={(e) => {
                e.stopPropagation();
                handleAddSearchParamsToUrl('ContentId', row.original.id);
              }}
            >
              Editar Conteúdos
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSubmitting}
              onClick={(e) => {
                e.stopPropagation();
                openAlertModal({
                  title: 'Ação Irreversivel!',
                  description:
                    'A exclusão de um conteúdo poder interferir nos agendamentos relacionados. Deseja prosseguir?',
                  callback: () => {
                    setIsSubmitting(true);
                    deleteContentsById.mutateAsync({ id: row.original.id });
                  },
                });
              }}
              className="text-red-500"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'sonner';
import { SimpleTable } from '@/components/simpleTable';
import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';
import { useGroupsToSendContentStore } from '@/features/campanhas/components/sheets/components/dataTableSelectGroupToSendMessage/useSendContentsToGroups';
import { useAlertDialog } from '@/components/alertAction';

export default function DataTableGroupsSheet({ columns, data, handleCloseModal }: any) {
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const contentsId = searchParams.get('SendContentToGroup');
  const campaignsId = useParams<{ campaignsId: string }>().campaignsId;
  const queryClient = useQueryClient();
  const { groupsToReciveContent } = useGroupsToSendContentStore();
  const { openAlertModal } = useAlertDialog()
  const table = useReactTable<any>({
    data: data as any,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const sendMessage = useApiMutation<
    any,
    { contentsId: string; campaignsId: string; allGroups: boolean; groupsIds: string[] }
  >('/contents/send', 'post', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['contents'],
      });
      toast.success('Conteúdo enviada com sucesso!');
      setIsSendSuccess(true);
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao enviar o conteúdo!');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  return (
    <div className=" w-full grid gap-4">
      <div className="overflow-auto h-[72vh]">
        {!isSendSuccess && <SimpleTable columnsLength={columns.length} table={table} />}
        {isSendSuccess && (
          <Card>
            <CardContent>
              <div className="flex gap-4">
                <div className="border-2 flex items-center justify-center border-green-500 rounded-full w-14 h-14">
                  <FaCheck className="text-green-500 w-10 h-10" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Sua Mensagem foi processada</p>
                  <p>Estamos enviando ela</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {isSendSuccess && (
        <Button
          onClick={() => {
            setIsSendSuccess(false);
            handleCloseModal();
          }}
        >
          Fechar
        </Button>
      )}
      {!isSendSuccess && (
        <Button
          disabled={groupsToReciveContent?.length === 0 || isSubmitting}
          onClick={(e) => {
            e.stopPropagation();
            openAlertModal({
              title: "Deseja continuar?",
              description: 'Você tem certeza de que deseja enviar esta mensagem?',
              callback: () => {
                sendMessage.mutateAsync({
                  contentsId: contentsId!,
                  campaignsId: campaignsId,
                  allGroups: false,
                  groupsIds: groupsToReciveContent,
                });
              }
            }),
            setIsSubmitting(true);
          }}
        >
          Enviar mensagem para grupos selecionados
        </Button>
      )}
    </div>
  );
}

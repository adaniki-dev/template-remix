'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { SimpleTable } from '@/components/simpleTable';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { useApiMutation } from '@/core/useAPI';
import { ColumnsImportsCommunitySheet } from './columns';

export default function DataTableImportsCommunitySheet({
  data,
  instanceKey,
  instanceId,
  setIsImported,
  setOpenTable,
}: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const table = useReactTable<any>({
    data: data as any,
    columns: ColumnsImportsCommunitySheet,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const importGroups = useApiMutation<any, any>('community/import', 'post', {
    onSuccess: () => {
      setOpenTable(false);
      setIsImported(true);
      toast.success(
        'Pedido foi realizado com sucesso, seu pedido está sendo realizando em segundo plano.',
      );
    },
    onError: () => {
      toast.error('Erro ao realizar pedido de importação');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  async function handleSendMessage(rawRows: any) {
    if (!rawRows) return;
    setIsSubmitting(true);
    const communityIds = rawRows.rows.map((row: any) => {
      return {
        id: row.original.id,
        key: instanceKey,
      };
    });
    const body = {
      instanceId: instanceId,
      campaignsId: params.campaignsId,
      community: communityIds,
    };
    await importGroups.mutateAsync(body);
  }

  return (
    <div className=" w-full grid gap-4">
      <div>
        <Button
          disabled={isSubmitting || table.getSelectedRowModel().rows.length <= 0}
          onClick={() => handleSendMessage(table.getSelectedRowModel())}
        >
          Importar comunidades{' '}
          {table.getSelectedRowModel().rows.length > 0 &&
            `${table.getSelectedRowModel().rows.length}`}
        </Button>
      </div>
      <SimpleTable columnsLength={ColumnsImportsCommunitySheet.length} table={table} />
    </div>
  );
}

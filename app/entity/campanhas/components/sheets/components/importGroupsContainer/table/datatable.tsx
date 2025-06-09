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
import { ColumnsImportsGroupsSheet } from '@/features/campanhas/components/sheets/components/importGroupsContainer/table/columns';
import { useApiMutation } from '@/core/useAPI';

export default function DataTableImportsGroupsSheet({
  data,
  instanceKey,
  setIsImported,
  setOpenTable,
}: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const table = useReactTable<any>({
    data: data as any,
    columns: ColumnsImportsGroupsSheet,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const importGroups = useApiMutation<any, any>('groups/instance/import', 'post', {
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
    const groupsIds = rawRows.rows.map((row: any) => {
      return {
        id: row.original.id,
        key: instanceKey,
      };
    });
    const body = {
      campaignsId: params.campaignsId,
      groups: groupsIds,
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
          Importar grupos{' '}
          {table.getSelectedRowModel().rows.length > 0 &&
            `${table.getSelectedRowModel().rows.length}`}
        </Button>
      </div>
      <SimpleTable columnsLength={ColumnsImportsGroupsSheet.length} table={table} />
    </div>
  );
}

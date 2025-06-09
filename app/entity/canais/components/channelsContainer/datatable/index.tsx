'use client';
import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';
import { ColumnsChannels } from '@/features/canais/components/channelsContainer/datatable/columns';
import DataTableChannels from '@/features/canais/components/channelsContainer/datatable/datatable';
import { useChannelsContext } from '@/features/canais/context/channelsProvider';
import { Fragment } from 'react';

export function TableChannels() {
  const { data, isLoading, isError } = useChannelsContext().queryChannels;
  return (
    <Fragment>
      {isLoading && (
        <div className="flex flex-col space-y-4 p-4">
          <TableSkeleton />
        </div>
      )}

      {!isLoading && data && data.data && data.data.length > 0 && (
        <DataTableChannels columns={ColumnsChannels} data={data.data} />
      )}
      {!isLoading && data && data.data && data.data.length <= 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum canal encontrado</p>
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar canais</p>
        </div>
      )}
    </Fragment>
  );
}

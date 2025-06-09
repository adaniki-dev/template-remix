'use client';
import { ColumnsCampaigns } from '@/features/campanhas/components/campaignContainer/datatable/columns';
import DataTableCampaigns from '@/features/campanhas/components/campaignContainer/datatable/datatable';
import { useCampaignsContext } from '@/features/campanhas/context/campaignsContext';
import { Fragment } from 'react';
import PaginationCampaigns from './pagination';
import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';



export function TableCampaigns() {
  const { data, isLoading, isError } = useCampaignsContext().queryCampains;

  return (
    <Fragment>
      {isLoading && !data && (
        <TableSkeleton colunsLength={7}/>
      )}
      {!isLoading && data && data.data && data.data.length > 0 && (
        <>
          <DataTableCampaigns columns={ColumnsCampaigns} data={data.data} />

          <div className="flex w-full justify-center items-center">
            <PaginationCampaigns />
          </div>
        </>
      )}
      {!isLoading && data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum grupo encontrado</p>
        </div>
      )}
      {isError && !data && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar grupos</p>
        </div>
      )}
    </Fragment>
  );
}

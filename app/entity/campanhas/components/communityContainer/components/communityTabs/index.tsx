'use client';

import { ColumnsCommunity } from '@/features/campanhas/components/communityContainer/components/communityTabs/columns';
import DataTableCommunity from '@/features/campanhas/components/communityContainer/components/communityTabs/datatable';
import PaginationCommunity from '@/features/campanhas/components/communityContainer/components/communityTabs/pagination';
import { useCommunityContext } from '@/features/campanhas/context/communityContext';
import { Fragment } from 'react';

export default function CommunityTabs() {
  const { queryCommunity } = useCommunityContext();
  const { data, isLoading, isError, isRefetching } = queryCommunity;
  return (
    <Fragment>
      {(isLoading || isRefetching) && !data && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}
      {data && data.data && data.data.length > 0 && (
        <>
          <DataTableCommunity columns={ColumnsCommunity} data={data} />
          <div className="flex w-full justify-center items-center">
            <PaginationCommunity />
          </div>
        </>
      )}
      {data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhuma comunidade encontrada</p>
        </div>
      )}
      {!data && isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar comunidade</p>
        </div>
      )}
    </Fragment>
  );
}

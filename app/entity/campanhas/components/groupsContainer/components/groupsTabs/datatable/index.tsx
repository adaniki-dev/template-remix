'use client';
import { ColumnsGroups } from '@/features/campanhas/components/groupsContainer/components/groupsTabs/datatable/columns';
import DataTableGroups from '@/features/campanhas/components/groupsContainer/components/groupsTabs/datatable/datatable';
import { useGroupsContext } from '@/features/campanhas/context/groupsContext';
import { Fragment } from 'react';
import PaginationGroups from './pagination';

export function TableGroups() {
  const { queryGroups } = useGroupsContext();
  const { data, isLoading, isError, isRefetching } = queryGroups;

  return (
    <Fragment>
      {(isLoading || isRefetching) && !data && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}
      {data && data.data && data.data.length > 0 && (
        <>
          <DataTableGroups columns={ColumnsGroups} data={data.data} />
          <div className="flex w-full justify-center items-center">
            <PaginationGroups />
          </div>
        </>
      )}
      {data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum grupo encontrado</p>
        </div>
      )}
      {!data && isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar grupos</p>
        </div>
      )}
    </Fragment>
  );
}

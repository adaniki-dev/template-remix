'use client';
import { ColumnsContents } from './columns';
import DataTableContents from './datatable';
import { Fragment } from 'react';
import PaginationContents from './pagination';
import { useContentsSheetProvider } from '@/modules/contents/context/contentsProvider';

export function TableContents() {
  const { data, isLoading, isError } = useContentsSheetProvider().queryContents;

  return (
    <Fragment>
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Carregando seus conteúdos</p>
        </div>
      )}
      {!isLoading && data && data.data && data.data.length > 0 && (
        <>
          <DataTableContents columns={ColumnsContents} data={data.data} />
          <div className="flex w-full justify-center items-center">
            <PaginationContents />
          </div>
        </>
      )}
      {!isLoading && data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum conteúdo encontrado</p>
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar conteúdo</p>
        </div>
      )}
    </Fragment>
  );
}

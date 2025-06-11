'use client';

import { ColumnsRelatory } from '@/features/relatory/components/relatoryTabs/datatable/columns';
import MessageGraphicRelatory from './mesageGraphicRelatory';
import { Skeleton } from '@/components/ui/skeleton';
import DataTableRelatory from '@/features/relatory/components/relatoryTabs/datatable/dataTable';
import PaginationRelatory from '@/features/relatory/components/relatoryTabs/datatable/paginationRelatory';
import { useDashboardContext } from '@/features/relatory/context/dashboardContext';
import React, { Fragment } from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { CiWarning } from 'react-icons/ci';

export default function RelatoryTabs() {
  const { data, isLoading, isError } = useDashboardContext().queriesOptions;
  return (
    <div className="p-10">
      {isLoading && (
        <div className="w-full flex flex-col items-center gap-3 justify-center">
          <Skeleton className="h-[330px] w-full" />
          <Skeleton className="h-[530px] w-full" />
        </div>
      )}
      {!isLoading && data && data['messages']?.length > 0 && (
        <Fragment>
          <MessageGraphicRelatory data={data} days={30} />
          <DataTableRelatory data={data['messages']} columns={ColumnsRelatory} />
          <div className="w-full flex items-center justify-center mt-6">
            <PaginationRelatory
              currentPage={data?.page}
              pageSize={data?.pageSize}
              totalCount={data?.total}
            />
          </div>
        </Fragment>
      )}
      {!isLoading && !isError && data && data['messages']?.length === 0 && (
        <div className="w-full flex flex-col  justify-center h-[85vh]">
          <div className="w-full rounded-lg bg-white shadow-lg max-w-md mx-auto p-8">
            <div className="flex flex-col items-center justify-center pt-6">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <FaRegMessage className="text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Nenhuma mensagem disparada</h2>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className="w-full flex flex-col  justify-center h-[85vh]">
          <div className="w-full rounded-lg bg-white shadow-lg max-w-md mx-auto p-8">
            <div className="flex flex-col items-center justify-center gap-3 pt-6">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <CiWarning className="text-red-500" />
              </div>
              <p className="text-gray-500">Erro ao buscar mensagens</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

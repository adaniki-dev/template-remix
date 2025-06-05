'use client';

import React, { Fragment } from 'react';
import DataTableTicket from './dataTable/dataTable';
import PaginationTicket from './dataTable/paginationTicket';
import { ColumnsTicket } from './dataTable/columns';
import { Button } from '@/components/ui/button';
import { IoTicketOutline } from 'react-icons/io5';
import { useTicketContext } from '../../context/ticketsContext';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { CiWarning } from 'react-icons/ci';
import { Skeleton } from '@/components/ui/skeleton';

export default function TicketTabs() {
  const { queryTickets } = useTicketContext();
  const { data, isLoading, isError } = queryTickets;
  const tickets = data?.tickets?.ticket ? data?.tickets?.ticket : [];

  return (
    <div className="w-full max-w-7xl mb-10">
      {isLoading && !data && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="w-3/4 h-6 rounded-md" />
          ))}
        </div>
      )}
      {!isError && tickets && tickets?.length > 0 && (
        <Fragment>
          <DataTableTicket data={tickets} columns={ColumnsTicket} />
          <div className="w-full flex items-center justify-center mt-6">
            <PaginationTicket
              perPage={data?.perpage}
              page={data?.page}
              totalCount={data?.totalresults}
            />
          </div>
        </Fragment>
      )}
      {!isError && data && tickets?.length === 0 && (
        <div className="w-full flex flex-col  justify-center h-[85vh]">
          <div className="w-full rounded-lg bg-white shadow-lg max-w-md mx-auto p-8">
            <div className="flex flex-col items-center justify-center pt-6">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <IoTicketOutline className="text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Nenhum Ticket Recente</h2>
              <Button onClick={() => handleAddSearchParamsToUrl('CreateTicket', 'y')}>
                Enviar Ticket
              </Button>
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
              <p className="text-gray-500">Erro ao buscar tickets</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

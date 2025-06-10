'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DataTableSchedule from './datatable';
import { ColumnsSchedule } from './columns';
import PaginationSchedule from './pagination';
import { useScheduleContext } from '@/features/agendamento/context/scheduleProvider';

export default function SchedulingTabs() {
  const { data, isLoading, isError } = useScheduleContext().querySchedule;

  const table = useReactTable<any>({
    data: data?.data || [],
    columns: ColumnsSchedule,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      {!isLoading && data && data.data && data.data.length > 0 && (
        <>
          <DataTableSchedule columns={ColumnsSchedule.length} table={table} />
          <div className="flex w-full justify-center items-center">
            <PaginationSchedule />
          </div>
        </>
      )}
      {!isLoading && data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum agendamento encontrado</p>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Erro ao carregar os dados</p>
        </div>
      )}
    </div>
  );
}

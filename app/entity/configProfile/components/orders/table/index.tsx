'use client';

import { useOrderProvider } from '@/features/configProfile/context/faturaContext';
import OrdersTable from './OrdersTable';
import { OrderColumns } from './OrderColumns';
import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';

export default function DataTableOrder() {
  const { queriesOptions } = useOrderProvider();
  const { data, isLoading } = queriesOptions;
  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : data?.data ? (
        <OrdersTable columns={OrderColumns} data={data.data} />
      ) : (
        <div>Nenhum registro foi encontrado</div>
      )}
    </>
  );
}

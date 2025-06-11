'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DataTableIntegrationsHooks from './integrationInstance/dataTableIntegrationsHooksConfig/datatable';
import { ColumnsIntegrationsHooks } from './integrationInstance/dataTableIntegrationsHooksConfig/colunmHooks';
import { useConfigHookContext } from '@/features/integrations/context/configHooksContext';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function IntegrationDetailsHooksBody({ type }: any) {
  const { hooksClientQueries } = useConfigHookContext();
  const { data, isLoading } = hooksClientQueries;

  const table = useReactTable<any>({
    data: isLoading ? [] : data ? data[type] : [],
    columns: ColumnsIntegrationsHooks,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onRowClick(row: any) {
    handleAddSearchParamsToUrl('editMessage', row.id);
    handleAddSearchParamsToUrl('type', type);
  }

  return (
    <div>
      <DataTableIntegrationsHooks
        columnsLength={ColumnsIntegrationsHooks.length}
        onClickRow={onRowClick}
        table={table}
      />
    </div>
  );
}

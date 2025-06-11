'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ColumnsIntegrationsHooksTemplate } from './integrationInstance/dataTableIntegrationsHooksConfig/columnsIntegrationsHooksTemplate';
import DataTableIntegrationsHooks from './integrationInstance/dataTableIntegrationsHooksConfig/datatable';
import { useConfigHookContext } from '@/features/integrations/context/configHooksContext';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function IntegrationDetailsBody({ type }: any) {
  const { hooksQueries } = useConfigHookContext();
  const { data, isLoading } = hooksQueries;

  const table = useReactTable<any>({
    data: isLoading ? [] : data ? data[type] : [],
    columns: ColumnsIntegrationsHooksTemplate,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onRowClick(row: any) {
    handleAddSearchParamsToUrl('showTemplate', row.id);
    handleAddSearchParamsToUrl('type', type);
  }

  return (
    <div>
      <DataTableIntegrationsHooks
        columnsLength={ColumnsIntegrationsHooksTemplate.length}
        onClickRow={onRowClick}
        table={table}
      />
    </div>
  );
}

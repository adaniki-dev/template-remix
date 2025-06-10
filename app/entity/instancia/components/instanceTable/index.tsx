'use client';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ColumnsInstance } from './colunmInstances';
import DataTableInstances from './datatable';
import { useInstanceContext } from '../../context/instanceContext';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { DialogShowQRcode } from '@/features/instancia/components/dialogs/qrCodeDialog';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import { Fragment } from 'react';

export default function TableInstance() {
  const { queriesOptions } = useInstanceContext();
  const { data } = queriesOptions;
  const table = useReactTable<any>({
    data: data,
    columns: ColumnsInstance,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  function onRowClick(row: any) {
    if (!row.isEnabled) {
      handleAddSearchParamsToUrl('qrCodeScan', row.id);
    }
  }

  return (
    <Fragment>
      <SuspenseWrapper modal={DialogShowQRcode} />
      {data && (
        <DataTableInstances
          columnsLength={ColumnsInstance?.length}
          onClickRow={onRowClick}
          table={table}
        />
      )}
    </Fragment>
  );
}

import React, { useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columnsAdmin } from '../dataTableAdmin/columns';
import AdminTelephone from '../addAdminTelephone';
import DataTableIntegrationsAdmin from '../dataTableAdmin/datatable';

const TableAdmin = ({ data }: { data: any[] }) => {
  return (
    <div className="relative z-10">
      {data.length > 0 ? (
        <DataTableIntegrationsAdmin data={data} columns={columnsAdmin} />
      ) : (
        <p className="flex justify-start mt-4">Nenhum telefone adicionado.</p>
      )}
    </div>
  );
};

export default TableAdmin;

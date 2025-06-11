'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columnsAdmin: ColumnDef<any>[] = [
  {
    accessorKey: 'telefone',
    header: 'Telefone',
    cell: ({ row }) => {
      const telefone = row.getValue('telefone');

      const formattedPhone = telefone
        ? String(telefone).replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
        : 'N/A';

      return <p style={{ color: '#444', fontSize: '14px' }}>{formattedPhone}</p>;
    },
  },
];

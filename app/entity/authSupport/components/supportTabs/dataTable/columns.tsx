'use client';
import { ColumnDef } from '@tanstack/react-table';
import DropdownTicket from './dropdownTicket';
import DropdownHeaderTicket from './dropdownHeaderTicket';
import { Checkbox } from '@/components/ui/checkbox';
import { getStatusDetails } from '@/features/authSupport/components/tickedId/utils/getStatusDetails';

export const ColumnsTicket: ColumnDef<any>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          className="cursor-default"
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          checked={row.getIsSelected()}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      );
    },
    minSize: 60,
    maxSize: 170,
    size: 32,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
  {
    accessorKey: 'ticketid',
    header: 'Ticket',
    cell: ({ row }) => <p className="font-bold">#{row.getValue('ticketid')}</p>,
    enableResizing: false,
    size: 100,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'subject',
    header: 'Assunto',
    cell: ({ row }) => <p className="text-sm">{row.getValue('subject')}</p>,
    enableResizing: false,
    size: 290,
    minSize: 100,
    maxSize: 340,
  },
  // {
  //   accessorKey: 'priority',
  //   header: 'Prioridade',
  //   cell: ({ row }) => {
  //     const getPriorityColor = (priority: string) => {
  //       switch (priority.toLowerCase()) {
  //         case 'alta': return 'bg-red-400 text-red-100'
  //         case 'media': return 'bg-orange-100 text-orange-800'
  //         case 'baixa': return 'bg-blue-100 text-blue-800'
  //         default: return 'bg-gray-100 text-gray-800'
  //       }
  //     }
  //     return(
  //       <p className={`${getPriorityColor(row.getValue('priority'))} rounded-md p-1 text-center`}>{row.getValue('priority')}</p>
  //     )
  //   },
  //   enableResizing: false,
  //   size: 140,
  //   minSize: 100,
  //   maxSize: 270,
  // },
  {
    accessorKey: 'deptname',
    header: 'Departamento',
    cell: ({ row }) => <p className="text-sm">{row.getValue('deptname')}</p>,
    enableResizing: false,
    size: 200,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = getStatusDetails(row.getValue('status'));
      return (
        <p className={`${status?.color} shadow-lg rounded-md p-1 font-bold text-center`}>
          {status?.name}
        </p>
      );
    },
    enableResizing: false,
    size: 160,
    minSize: 100,
    maxSize: 270,
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const rawRows = table.getSelectedRowModel();
      const rows = rawRows.rows.map((row) => row.original);
      return <DropdownHeaderTicket rows={rows} />;
    },
    cell: ({ row }) => {
      return <DropdownTicket row={row} />;
    },
    enableResizing: false,
    size: 160,
    minSize: 90,
    maxSize: 180,
  },
];

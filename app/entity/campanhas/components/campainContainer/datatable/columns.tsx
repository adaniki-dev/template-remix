'use client';

import InputFieldCopyAndPaste from '@/components/ui-modified/inputFieldCopyAndPaste';
import { Checkbox } from '@/components/ui/checkbox';
import DropdownHeaderMenuCampaigns from '@/features/campanhas/components/campaignContainer/datatable/dropdownHeaderMenu';
import DropdownLinksMenu from '@/features/campanhas/components/campaignContainer/datatable/dropdownLinksMenu';
import DropdownSingleMenuCampaigns from '@/features/campanhas/components/campaignContainer/datatable/dropdownSingleMenu';
import formatarData from '@/util/formatDate';
import { ColumnDef } from '@tanstack/react-table';

const dictionaryStrategy = (type: 'balanced' | 'sequential') =>
  ({
    balanced: 'Balanceada',
    sequential: 'Sequencial',
  })[type] || 'Indefinida';

export const ColumnsCampaigns: ColumnDef<any>[] = [
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
    accessorKey: 'title',
    header: 'Nome',

    cell: ({ row }) => row.getValue('title'),
    size: 240,
    enableSorting: false,
    enableResizing: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (row.getValue('status') ? 'Ativo' : 'Inativo'),
    size: 100,
    enableResizing: false,
  },

  {
    accessorKey: 'startedIn',
    header: 'Data de início',
    cell: ({ row }) => formatarData(row.getValue('startedIn')),
    enableResizing: false,
  },
  {
    accessorKey: 'finishedAt',
    header: 'Data de término',
    cell: ({ row }) =>
      row.getValue('finishedAt') ? formatarData(row.getValue('finishedAt')) : 'Indeterminado',
    enableResizing: false,
  },
  {
    accessorKey: 'universalLink',
    header: 'Universal Link',
    cell: ({ row }) => {
      return <DropdownLinksMenu name="Links Universais" link={row.original.link} />;
    },
    size: 180,
    enableResizing: false,
  },
  {
    accessorKey: 'deepLink',
    header: 'Deep Link',
    cell: ({ row }) => {
      return <DropdownLinksMenu name="Deep Links" link={row.original.link} deeplink />;
    },
    size: 180,
    enableResizing: false,
  },
  {
    accessorKey: 'totalGroups',
    header: 'Grupos',
    cell: ({ row }) => row.getValue('totalGroups'),
    enableResizing: false,
    size: 120,
  },
  {
    accessorKey: 'fillStrategy',
    header: 'Captação',
    cell: ({ row }) => dictionaryStrategy(row.getValue('fillStrategy')),
    enableResizing: false,
    size: 120,
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const rawRows = table.getSelectedRowModel();
      const rows = rawRows.rows.map((row) => row.original);
      return <DropdownHeaderMenuCampaigns rows={rows} />;
    },
    cell: ({ row }) => {
      return <DropdownSingleMenuCampaigns row={row} />;
    },
    enableResizing: false,
  },
];

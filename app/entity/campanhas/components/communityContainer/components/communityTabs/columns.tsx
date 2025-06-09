'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ColumnDef } from '@tanstack/react-table';
import { Fragment } from 'react';
import { MdGroups } from 'react-icons/md';
import { Progress } from '@/components/ui/progress';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import DropdownHeaderMenuCommunity from '@/features/campanhas/components/communityContainer/components/communityTabs/dropdownHeaderMenuCommunity';
import DropdownSingleMenuCommunityProps from '@/features/campanhas/components/communityContainer/components/communityTabs/dropdownSingleMenuCommunityProps';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/util/copyToClipboard';
import { FaCopy } from 'react-icons/fa';

export const ColumnsCommunity: ColumnDef<any>[] = [
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
    size: 36,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: 'Foto',
    cell: ({ row }) => {
      if (!row.getValue('image')) {
        return (
          <div className="border-2 border-primary rounded-full w-9 h-9 flex items-center justify-center">
            <MdGroups className="text-2xl text-primary" />
          </div>
        );
      } else {
        return (
          <img
            src={row.getValue('image')}
            alt="group"
            className="w-9 h-9 object-cover rounded-full"
          />
        );
      }
    },
    enableResizing: false,
    size: 72,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
    enableResizing: false,
    size: 220,
  },
  {
    accessorKey: 'isLeadCaptureActive',
    header: 'Em captação',
    cell: ({ row }) => {
      const { editCommunity } = useGroupActions();
      const handleChange = (checked: boolean) => {
        const body: { ids: string[]; community: { isLeadCaptureActive: boolean } } = {
          ids: [row.original.id],
          community: {
            isLeadCaptureActive: checked,
          },
        };
        editCommunity(body);
      };
      return (
        <Fragment>
          <Switch checked={row.original.isLeadCaptureActive} onCheckedChange={handleChange} />
        </Fragment>
      );
    },
    enableResizing: false,
    size: 120,
  },
      {
    accessorKey: 'link',
    header: 'Links WhatsApp',
    cell: ({ row }) => {
      return (
        <Button onClick={(e) => copyToClipboard(e, row.original.link)} size="sm">
          <FaCopy />
        </Button>
      );
    },
    enableResizing: false,
    size: 140,
  },
  {
    accessorKey: 'memberLimit',
    header: 'Usuários por Limites',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-center justify-start pr-4 gap-1">
          <Progress
            value={row.original.capacityPercentage.replace(/[%\s]/g, '')}
            max={100}
            className="w-full ml-2"
          />
          <div className="w-full text-xs flex justify-between">
            <span>{row.original.currentMembers}</span>
            <span>{row.original.memberLimit}</span>
          </div>
        </div>
      );
    },
    enableResizing: false,
    size: 172,
  },
  // {
  //   accessorKey: 'link',
  //   header: 'Links WhatsApp',
  //   cell: ({ row }) => {
  //     return (
  //       <Button onClick={(e) => copyToClipboard(e, row.original.link)} size="sm">
  //         <FaCopy />
  //       </Button>
  //     );
  //   },
  //   enableResizing: false,
  //   size: 140,
  // },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const selectedRows = table.getSelectedRowModel();
      return <DropdownHeaderMenuCommunity rows={selectedRows.rows} />;
    },
    cell: ({ row }) => {
      return <DropdownSingleMenuCommunityProps row={row} />;
    },
    enableResizing: false,
    size: 280,
    enableHiding: false,
  },
];

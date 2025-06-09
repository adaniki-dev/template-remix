'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import DropdownHeaderMenuGroups from '@/features/campanhas/components/groupsContainer/components/groupsTabs/datatable/dropdownHeaderMenu';
import DropdownSingleMenuGroup from '@/features/campanhas/components/groupsContainer/components/groupsTabs/datatable/dropdownSingleMenu';
import { ColumnDef } from '@tanstack/react-table';
import { Fragment } from 'react';
import { MdGroups } from 'react-icons/md';
import { FaMessage } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { copyToClipboard } from '@/util/copyToClipboard';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatPhoneNumber } from '@/util/formatPhoneNumber';
import { Progress } from '@/components/ui/progress';
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';

export const ColumnsGroups: ColumnDef<any>[] = [
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
      const { toggleGroups } = useGroupActions();
      const handleChange = (checked: boolean) => {
        const body = {
          instanceId: row.original.instanceId,
          ids: [row.original.id],
          isLeadCaptureActive: checked,
        };
        toggleGroups(body);
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
  {
    accessorKey: 'canMessageAdmin',
    header: 'Apenas admins',
    cell: ({ row }) => {
      return (
        <div className="flex gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaMessage
                  className={`text-lg ${row.original.canMessageAdmin ? 'text-primary' : 'text-muted'}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                {row.original.canMessageAdmin
                  ? 'Apenas admins podem enviar mensagens'
                  : 'Qualquer membro pode enviar mensagens'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaCog
                  className={`text-lg ${row.original.canChangeSettingsAdmin ? 'text-primary' : 'text-muted'}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                {row.original.canChangeSettingsAdmin
                  ? 'Apenas admins podem alterar configurações'
                  : 'Qualquer membro pode alterar configurações'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoPersonAdd
                  className={`text-lg ${row.original.mode === 'admin_add' ? 'text-primary' : 'text-muted'}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                {row.original.mode
                  ? 'Apenas admins podem adicionar membros'
                  : 'Qualquer membro pode adicionar membros'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    enableResizing: false,
    size: 140,
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
    accessorKey: 'additionalFields.creation',
    header: 'Data de Criação',
    cell: ({ row }) => {
      function formatarData(dataISO: string | null | undefined, onlyDate = false): string {
        if (!dataISO) {
          return 'sem data';
        }

        const data = new Date(dataISO);

        if (isNaN(data.getTime())) {
          return 'sem data';
        }

        // Usando getDate(), getHours(), etc. para usar o horário local
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        if (onlyDate) {
          return `${dia}/${mes}/${ano}`;
        }
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      }
      if (!row.original.additionalFields?.creation) return null;

      const date = new Date(row.original.additionalFields?.creation);
      if (isNaN(date.getTime())) return null;

      return <p className="text-sm">{formatarData(row.original.additionalFields.creation)}</p>;
    },
    enableResizing: false,
    size: 160,
  },
  {
    accessorKey: 'additionalFields.owner',
    header: 'Dono',
    cell: ({ row }) => {
      return <p>{formatPhoneNumber(row.original.additionalFields?.owner)}</p>;
    },
    enableResizing: false,
    size: 160,
  },
  {
    accessorKey: 'actions',
    header: ({ table }) => {
      const selectedRows = table.getSelectedRowModel();
      return <DropdownHeaderMenuGroups rows={selectedRows.rows} />;
    },
    cell: ({ row }) => {
      return <DropdownSingleMenuGroup row={row} />;
    },
    enableResizing: false,
    size: 280,
    enableHiding: false,
  },
];

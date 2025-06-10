'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DropdownSingleMenu from './dropdownSingleMenu';

const dictionaryStatus = (status: string) =>
  ({
    pending: <p className="py-1 px-2 bg-yellow-400/50 rounded-lg text-center">Pendente</p>,
    processing: <p className="py-1 px-2 bg-yellow-400/50 rounded-lg text-center">Processando</p>,
    completed: <p className="py-1 px-2 bg-green-400/50 rounded-lg text-center">Concluído</p>,
    cancelled: <p className="py-1 px-2 bg-red-400/50 rounded-lg text-center">Cancelado</p>,
    failed: <p className="py-1 px-2 bg-red-400/50 rounded-lg text-center">Falhou</p>,
    recurrence: <p className="py-1 px-2 bg-blue-400/50 rounded-lg text-center">Recorrência</p>,
  })[status] || status;

const dictionaryType = (type: string) =>
  ({
    send_message: 'Enviar mensagem',
    add_group_description: 'Adicionar descrição ao grupo',
    export_group_contacts: 'Exportar contatos do grupo',
    change_group_name: 'Alterar nome do grupo',
    change_group_image: 'Alterar imagem do grupo',
    add_user_to_group: 'Adicionar usuário ao grupo',
    edit_group_data: 'Editar dados do grupo',
    open_close_group: 'Abrir/fechar grupo',
  })[type] || type;

interface TimeConfig {
  time: string;
  daily: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  monthly: boolean;
  yearly: boolean;
}

// Então pode usar assim:
const timeConfigDictionary = (key: keyof TimeConfig) =>
  ({
    time: 'Horário',
    daily: <p key="dia">Diariamente</p>,
    monday: (
      <p
        key="seg"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Seg
      </p>
    ),
    tuesday: (
      <p
        key="ter"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Ter
      </p>
    ),
    wednesday: (
      <p
        key="qua"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Qua
      </p>
    ),
    thursday: (
      <p
        key="qui"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Qui
      </p>
    ),
    friday: (
      <p
        key="sex"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Sex
      </p>
    ),
    saturday: (
      <p
        key="sab"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Sab
      </p>
    ),
    sunday: (
      <p
        key="dom"
        className="rounded-full bg-primary w-6 h-6 text-xs flex items-center justify-center text-white"
      >
        Dom
      </p>
    ),
    monthly: <p key="men">Mensalmente</p>,
    yearly: <p key="anu">Anualmente</p>,
  })[key] || '';

export const ColumnsSchedule: ColumnDef<any>[] = [
  {
    accessorKey: 'checkbox',
    header: ({ table }) => {
      return (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        className="cursor-default"
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        checked={row.getIsSelected()}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
    minSize: 60,
    maxSize: 170,
    size: 32,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'content',
    header: 'Conteúdo',
    cell: ({ row }) => {
      return <p>{row.original.contentsName}</p>;
    },
    enableResizing: false,
    size: 160,
  },
  {
    accessorKey: 'type',
    header: 'Tipo de mensagem',
    cell: ({ row }) => {
      return <p>{dictionaryType(row.getValue('type'))}</p>;
    },
    enableResizing: false,
    size: 180,
    minSize: 100,
    maxSize: 340,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => dictionaryStatus(row.getValue('status')),
    enableResizing: false,
    size: 160,
  },
  {
    accessorKey: 'sendDate',
    header: 'Data de envio',
    cell: ({ row }) => {
      const translatedKeys = (recurrences: any) => {
        if (recurrences) {
          const activeDays = Array.from(Object.entries(recurrences))
            .filter(([_, value]) => value === true)
            .map(([key]) => timeConfigDictionary(key as keyof TimeConfig));
          return activeDays;
        }
        return 'Não recorrente';
      };
      return (
        <div className="flex gap-1">
          {row.getValue('sendDate') ?? translatedKeys(row.original.recurrence)}
        </div>
      );
    },
    enableResizing: false,
    size: 220,
  },
  {
    accessorKey: 'exactTime',
    header: 'Horário de envio',
    cell: ({ row }) => {
      const exactTime = row.getValue('exactTime') ?? row.original.recurrence.time;
      return exactTime;
    },
    enableResizing: false,
    size: 160,
    minSize: 100,
    maxSize: 270,
  },
  {
    header: 'Ações',
    cell: ({ row }) => {
      return <DropdownSingleMenu row={row} />;
    },
    enableResizing: false,
    size: 100,
    minSize: 100,
    maxSize: 220,
  },
];

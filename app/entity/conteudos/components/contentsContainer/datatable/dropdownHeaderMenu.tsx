'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChannelContentsActions } from '@/features/canais/hooks/useChannelContentsActions';

import { useState } from 'react';

export default function DropdownHeaderMenuContents({ rows }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deleteContents } = useChannelContentsActions();

  function handleDelete(rows: any) {
    setIsSubmitting(true);
    let queires = [];
    for (const row of rows) {
      row.id && queires.push(deleteContents(row.id));
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex text-center items-center justify-center w-36 px-2 py-1 bg-primary rounded-md text-white">
          Ações em massas
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={() => handleDelete(rows)}
            className="text-red-500"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

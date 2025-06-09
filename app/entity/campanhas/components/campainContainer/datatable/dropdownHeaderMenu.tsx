'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCampaignOperations } from '@/features/campanhas/hooks/useCampaignOperations';
import { useState } from 'react';

export default function DropdownHeaderMenuCampaigns({ rows }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestLeadInCsv, deleteCampaigns } = useCampaignOperations();

  async function handleDelete() {
    setIsSubmitting(true);
    await deleteCampaigns(
      { ids: rows.map((row: any) => row.original.id) },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  }

  const handleRequestLeadInCsv = async () => {
    setIsSubmitting(true);

    await requestLeadInCsv(
      { ids: rows.map((row: any) => row.original.id) },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

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
            onClick={() => handleRequestLeadInCsv()}
            className="text-red-500"
          >
            Solicitar leads em CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={() => handleDelete()}
            className="text-red-500"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

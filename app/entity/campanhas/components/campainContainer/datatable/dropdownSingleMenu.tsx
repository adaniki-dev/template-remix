'use client';
import { Button } from '@/components/ui/button';
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
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { UsersRound } from 'lucide-react';
import { useState } from 'react';

export default function DropdownSingleMenuCampaigns({ row }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestLeadInCsv, deleteCampaigns, strategyFillCampaigns } = useCampaignOperations();

  async function handleDelete() {
    setIsSubmitting(true);
    await deleteCampaigns(
      { ids: [row.original.id] },
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
      { ids: [row.original.id] },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  const handleStrategyFillCampaigns = async (type: 'balanced' | 'sequential') => {
    setIsSubmitting(true);
    await strategyFillCampaigns(
      { id: row.original.id, type },
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
        <Button size="sm" variant="outline">
          Opções
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center">
            <UsersRound className="w-5 h-5 mr-2" />
            Opções de Leads
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleRequestLeadInCsv();
            }}
          >
            Solicitar Leads em CSV{' '}
            <span className="text-xs bg-yellow-500 px-2 py-[1px] rounded-full">BETA</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleAddSearchParamsToUrl('campaignsCsv', row.original.id);
            }}
          >
            Histórico de CSV
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Estratégia de Captação</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    handleStrategyFillCampaigns('sequential');
                    e.stopPropagation;
                  }}
                >
                  Sequencial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    handleStrategyFillCampaigns('balanced');
                    e.stopPropagation;
                  }}
                >
                  Balanceado
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">Opções da Campanha</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleAddSearchParamsToUrl('EditCampaigns', row.original.id);
            }}
          >
            Editar Campanhas
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isSubmitting}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-500"
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

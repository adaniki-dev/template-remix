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
import { useInstancesCampaignsActions } from '@/features/campanhas/hooks/useInstancesCampaignsActions';
import { useInstancesCampaignsStore } from '@/features/campanhas/hooks/useStoreInstanceCampaigns';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { Import, ScanQrCode, Shield } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

interface DropdownSingleMenuInstanceProps {
  row: {
    original: {
      id: string;
      isEnabled: boolean;
    };
  };
}

export default function DropdownSingleMenuInstances({ row }: DropdownSingleMenuInstanceProps) {
  const params = useParams();
  const campaignsId = params.campaignsId as string;
  const { removeInstancesOnCampaign } = useInstancesCampaignsActions();
  const { setInstances } = useInstancesCampaignsStore();

  async function handleRemoveInstance() {
    await removeInstancesOnCampaign.mutateAsync({
      campaignId: campaignsId,
      instances: [row.original.id],
    });
  }

  function handlePromoteToBackup() {
    setInstances([row.original.id]);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Opções
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <span className="flex gap-1 items-center">
            <ScanQrCode className="w-5 h-5" />
            Instância
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem
          disabled={row.original.isEnabled}
          onClick={() => handleAddSearchParamsToUrl('instanceId', row.original.id)}
        >
          <div className="flex items-center">
            {row.original.isEnabled ? 'Você está conectado' : 'Conectar'}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <span className="flex gap-1 items-center">
            <Import className="w-5 h-5" />
            Importações
          </span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleAddSearchParamsToUrl('ImportGroups', row.original.id)}
          >
            <div className="flex items-center">Importar Grupos</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAddSearchParamsToUrl('ImportCommunity', row.original.id)}
          >
            <div className="flex items-center">Importar Comunidade</div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <span className="flex gap-1 items-center">
              <Shield className="w-5 h-5" />
              Segurança
            </span>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={handlePromoteToBackup}>
            <div className="flex items-center">Ativar Contingência</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleRemoveInstance} className="text-destructive">
            <div className="flex items-center">
              <FaTrashAlt className="text-lg mr-2" />
              Remover instância
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

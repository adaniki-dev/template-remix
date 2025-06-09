import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

export default function DropdownHeaderMenuInstance({ rows }: any) {
  const hasRows = rows.length <= 0;
  const params = useParams();
  const campaignsId = params.campaignsId as string;
  const { removeInstancesOnCampaign } = useInstancesCampaignsActions();
  const { setInstances } = useInstancesCampaignsStore();

  async function handleRemoveInstance() {
    const instances = rows.map((row: any) => row.original.id);
    await removeInstancesOnCampaign.mutateAsync({
      campaignId: campaignsId,
      instances: instances,
    });
  }

  function handlePromoteToBackup() {
    const instances = rows.map((row: any) => row.original.id);
    setInstances(instances);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={hasRows} size="sm">
          Ações em massas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuItem onClick={handlePromoteToBackup}>
            <div className="flex items-center">Promover Instancias para backup</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleRemoveInstance} className="text-destructive">
            <div className="flex items-center">
              <FaTrashAlt className="text-lg mr-2" />
              Excluir Grupo
            </div>
          </DropdownMenuItem>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

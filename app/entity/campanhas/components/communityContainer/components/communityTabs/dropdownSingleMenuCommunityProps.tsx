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
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdminPanelSettings, MdModeEdit, MdPersonAdd } from 'react-icons/md';

export default function DropdownHeaderMenuCommunity({ rows }: any) {
  const { setEditGroupsIds, setMemberLimitGroups, setImageGroups } = useGroupStore();
  const { deleteCommunity, editCommunity, refreshGroups } = useGroupActions();
  const params = useParams();
  const campaignsId = params.campaignsId as string;
  const hasRows = rows.length <= 0;

  const handleToggleCapitationAction = async (condition: boolean) => {
    const communityWithCaptureLead = { isLeadCaptureActive: condition }; // Apenas um objeto

    await editCommunity({
      campaignsId,
      ids: rows.map((row: any) => row.original.id),
      community: communityWithCaptureLead, // Agora é um objeto único
    });
  };

  const handleDeleteAction = async () => {
    const communitysIds = rows.map((row: any) => row.original.id);

    await deleteCommunity({
      campaignsId,
      groupIds: communitysIds,
    });
  };

  const handleSimpleCommunityUpdate = (
    setFunction: typeof setMemberLimitGroups | typeof setImageGroups | typeof setEditGroupsIds,
  ) => {
    const communitysIds = rows.map((row: any) => row.original.id);
    setFunction({
      campaignsId: params.campaignsId as string,
      groupIds: communitysIds,
    });
  };

  const handleRefreshGroups = async () => {
    const communitysIds = rows.map((row: any) => row.original.id);

    await refreshGroups({
      campaignsId: campaignsId,
      ids: communitysIds,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={hasRows} size="sm">
          Ações em massas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center">
            <MdAdminPanelSettings className="text-lg mr-2" />
            Configurações da comunidade
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex items-center">
            <MdPersonAdd className="text-lg mr-2" />
            Leads
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Captação</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleToggleCapitationAction(true)}>
                Ativar captação
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleCapitationAction(false)}>
                Desativar captação
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* <DropdownMenuItem onClick={handleRequestLeadInCsv}>Solicitar CSV de leads</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex items-center">
            <MdModeEdit className="text-lg mr-2" />
            Edição e atualização
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuItem onClick={handleRefreshGroups}>Atualizar Links</DropdownMenuItem> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edição</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleSimpleCommunityUpdate(setEditGroupsIds)}>
                Editar Comunidades
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleCommunityUpdate(setMemberLimitGroups)}>
                Editar Limites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleCommunityUpdate(setImageGroups)}>
                Editar Imagens
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDeleteAction()} className="text-destructive">
            <div className="flex items-center">
              <FaTrashAlt className="text-lg mr-2" />
              Excluir Comunidade
            </div>
          </DropdownMenuItem> */}
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

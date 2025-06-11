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
import { useGroupActions } from '@/features/campanhas/hooks/useActionsGroups';
import { useGroupStore } from '@/features/campanhas/hooks/useStoreGroups';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdminPanelSettings, MdModeEdit, MdPersonAdd } from 'react-icons/md';

interface DropdownSingleMenuCommunityProps {
  row: {
    original: {
      id: string;
      instanceId: string;
    };
  };
}

export default function DropdownSingleMenuCommunityProps({
  row,
}: DropdownSingleMenuCommunityProps) {
  const { setEditGroupsIds, setMemberLimitGroups, setImageGroups } = useGroupStore();
  const { deleteCommunity, editCommunity, refreshGroups } = useGroupActions();
  const params = useParams();
  const campaignsId = params.campaignsId as string;

  const handleRefreshGroups = async () => {
    await refreshGroups({
      campaignsId: campaignsId,
      ids: [row.original.id],
    });
  };

  const handleToggleCapitationAction = async (condition: boolean) => {
    await editCommunity({
      campaignsId,
      community: { isLeadCaptureActive: condition },
      ids: [row.original.id],
    });
  };

  const handleDeleteAction = async () => {
    await deleteCommunity({
      campaignsId,
      groupIds: [row.original.id],
    });
  };

  const handleSimpleGroupUpdate = (
    setFunction: typeof setMemberLimitGroups | typeof setImageGroups | typeof setEditGroupsIds,
  ) => {
    setFunction({
      campaignsId: row.original.instanceId,
      groupIds: [row.original.id],
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Opções
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
        {/* <DropdownMenuLabel>
          <div className="flex items-center">
            <MdModeEdit className="text-lg mr-2" />
            Edição e atualização
          </div>
        </DropdownMenuLabel> */}
        {/* <DropdownMenuItem onClick={handleRefreshGroups}>Atualizar link</DropdownMenuItem> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edição da comunidade</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setEditGroupsIds)}>
                Editar Comunidade
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setMemberLimitGroups)}>
                Editar Limite
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setImageGroups)}>
                Editar Imagem
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-500" onClick={handleDeleteAction}>
            <div className="flex items-center">
              <FaTrashAlt className="text-lg mr-2" />
              Excluir Comunidade
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

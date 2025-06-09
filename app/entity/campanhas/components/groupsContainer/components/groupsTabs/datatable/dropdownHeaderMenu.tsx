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

export default function DropdownHeaderMenuGroups({ rows }: any) {
  const { setEditGroupsIds, setMemberLimitGroups, setImageGroups } = useGroupStore();
  const { deleteGroups, editGroups, refreshGroups, requestLeadInCsv } = useGroupActions();
  const params = useParams();
  const campaignsId = params.campaignsId as string;
  const hasRows = rows.length <= 0;

  const handleToggleAdminAction = async (condition: boolean) => {
    const groupsWithAdminActions = rows.map((row: any) => ({
      id: row.original.id,
      canMessageAdmin: condition,
    }));
    await editGroups({
      campaignsId,
      groups: groupsWithAdminActions,
    });
  };

  const handleChangeSettingsAction = async (condition: boolean) => {
    const groups = rows.map((row: any) => ({
      id: row.original.id,
      canChangeSettingsAdmin: condition,
    }));
    await editGroups({
      campaignsId,
      groups: groups,
    });
  };

  const handleToggleCapitationAction = async (condition: boolean) => {
    const groupsWithCaptureLead = rows.map((row: any) => ({
      id: row.original.id,
      isLeadCaptureActive: condition,
    }));

    await editGroups({
      campaignsId,
      groups: groupsWithCaptureLead,
    });
  };

  const handleDeleteAction = async () => {
    const groupsIds = rows.map((row: any) => row.original.id);

    await deleteGroups({
      campaignsId,
      groupIds: groupsIds,
    });
  };

  const handleSimpleGroupUpdate = (
    setFunction: typeof setMemberLimitGroups | typeof setImageGroups | typeof setEditGroupsIds,
  ) => {
    const groupsIds = rows.map((row: any) => row.original.id);
    setFunction({
      campaignsId: params.campaignsId as string,
      groupIds: groupsIds,
    });
  };

  const handleRefreshGroups = async () => {
    const groupsIds = rows.map((row: any) => row.original.id);

    await refreshGroups({
      campaignsId: campaignsId,
      ids: groupsIds,
    });
  };

  const handleRequestLeadInCsv = async () => {
    const groupsIds = rows.map((row: any) => row.original.id);

    await requestLeadInCsv({
      ids: groupsIds,
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
            Configurações do grupo
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Mensagens</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleToggleAdminAction(true)}>
                Apenas admins podem enviar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleAdminAction(false)}>
                Todos podem enviar
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Configurações do grupo</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleChangeSettingsAction(true)}>
                Apenas admins podem alterar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeSettingsAction(false)}>
                Todos podem alterar
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Membros</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleChangeSettingsAction(true)}>
                Apenas admins podem alterar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeSettingsAction(false)}>
                Todos membros podem alterar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

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
        <DropdownMenuItem onClick={handleRefreshGroups}>Atualizar Links</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edição</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setEditGroupsIds)}>
                Editar Grupos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setMemberLimitGroups)}>
                Editar Limites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setImageGroups)}>
                Editar Imagens
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDeleteAction()} className="text-destructive">
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

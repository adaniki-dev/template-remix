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
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdminPanelSettings, MdModeEdit, MdPersonAdd } from 'react-icons/md';

interface DropdownSingleMenuGroupProps {
  row: {
    original: {
      id: string;
      instanceId: string;
    };
  };
}

export default function DropdownSingleMenuGroup({ row }: DropdownSingleMenuGroupProps) {
  const { setEditGroupsIds, setMemberLimitGroups, setImageGroups } = useGroupStore();
  const { deleteGroups, editGroups, refreshGroups, requestLeadInCsv } = useGroupActions();
  const params = useParams();
  const campaignsId = params.campaignsId as string;

  const handleRefreshGroups = async () => {
    await refreshGroups({
      campaignsId: campaignsId,
      ids: [row.original.id],
    });
  };
  const handleToggleAdminAction = async (condition: boolean) => {
    await editGroups({
      campaignsId,
      groups: [{ id: row.original.id, canMessageAdmin: condition }],
    });
  };

  const handleChangeSettingsAction = async (condition: boolean) => {
    
    await editGroups({
      campaignsId,
      groups: [
        {
          id: row.original.id,
          canChangeSettingsAdmin: condition,
        },
      ],
    });
  };

  const handleChangeAddMode = async (mode: string) => {
    await editGroups({
      campaignsId,
      groups: [
        {
          id: row.original.id,
          mode: mode
        }
      ]
    })
  }

  const handleToggleCapitationAction = async (condition: boolean) => {
    await editGroups({
      campaignsId,
      groups: [{ id: row.original.id, isLeadCaptureActive: condition }],
    });
  };

  const handleDeleteAction = async () => {
    await deleteGroups({
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

  const handleRequestLeadInCsv = async () => {
    await requestLeadInCsv({
      ids: [row.original.id],
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
            Configurações do grupo
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Mensagens</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleToggleAdminAction(true)}>
                Apenas Admin podem enviar
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
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleChangeAddMode('admin_add')}>
                Somente administradores podem adicionar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeAddMode('all_member_add')}>
                Todos os membros podem adicionar
              </DropdownMenuItem>
            </DropdownMenuSubContent>
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
        <DropdownMenuItem onClick={handleRefreshGroups}>Atualizar link</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edição do grupo</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleSimpleGroupUpdate(setEditGroupsIds)}>
                Editar Grupo
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
        <DropdownMenuItem
          onClick={() => handleAddSearchParamsToUrl('ContactPromote', row.original.id)}
        >
          Promover contatos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-500" onClick={handleDeleteAction}>
            <div className="flex items-center">
              <FaTrashAlt className="text-lg mr-2" />
              Excluir Grupo
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

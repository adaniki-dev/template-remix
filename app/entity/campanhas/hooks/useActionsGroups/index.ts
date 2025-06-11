// hooks/useGroupActions.ts
import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation, useApiQuery } from '@/core/useAPI';
import { toast } from 'sonner';
import {
  ICreateCommunity,
  ICreateGroups,
  IDeleteGroups,
  IEditCommunity,
  IEditGroups,
  IPromoteContactToAdmin,
  IRefreshGroups,
} from '@/features/campanhas/hooks/useActionsGroups/types';

export const useGroupActions = () => {
  const queryClient = useQueryClient();

  const validatePhone = useApiMutation<any, string>('/validate/phone', 'get');

  const refreshGroups = useApiMutation<any, IRefreshGroups>('/groups/refresh', 'patch', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Pedido de atualização enviado');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao atualizar os grupos');
    },
  });

  const editGroups = useApiMutation<any, IEditGroups>('/groups', 'patch', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });

      // toast.success('Grupo alterado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao alterar o grupo');
    },
  });

  const editCommunity = useApiMutation<any, IEditCommunity>('/community/update', 'put', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });

      await queryClient.refetchQueries({
        queryKey: ['/groups/search'],
      })
      toast.success('Comunidade alterada com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao alterar a comunidade');
    },
  });

  // const editMode = useApiMutation<any

  const deleteGroups = useApiMutation<any, IDeleteGroups>('/groups', 'delete', {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Grupo apagado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao apagar o grupo');
    },
  });

  const deleteCommunity = useApiMutation<any, IDeleteGroups>('/groups', 'delete', {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Comunidade apagado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao apagar o Comunidade');
    },
  });

  const createGroups = useApiMutation<any, ICreateGroups>('/groups', 'post', {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Grupo criado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao criar o grupo');
    },
  });

  const createComunity = useApiMutation<any, ICreateCommunity>('/community/create', 'post', {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Comuidade criado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao criar a comunidade');
    },
  });

  const promoteContactsToAdmin = useApiMutation<any, IPromoteContactToAdmin>(
    (variables) => `groups/${variables.groupId}/promote-contact`,
    'post',
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['/groups/search'],
          refetchType: 'all',
        });
        toast.success('Contatos promovidos com sucesso');
      },
      onError: () => {
        toast.error('Desculpe, ocorreu um erro ao promover os contatos');
      },
    },
  );

  const requestLeadInCsv = useApiMutation<any, { ids: string[] }>('/groups/leads-csv', 'post', {
    onSuccess: async () => {
      toast.success('Pedido do link para download enviado');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao solicitar o link para download');
    },
  });

  const toggleGroups = useApiMutation<
    any,
    { instanceId: string; ids: string[]; isLeadCaptureActive: boolean }
  >('groups/toggle', 'put', {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['/groups/search'],
        refetchType: 'all',
      });
      toast.success('Grupo alterado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao alterar o grupo');
    },
  });

  return {
    refreshGroups: refreshGroups.mutateAsync,
    editGroups: editGroups.mutateAsync,
    editCommunity: editCommunity.mutateAsync,
    deleteGroups: deleteGroups.mutateAsync,
    createGroups: createGroups.mutateAsync,
    createComunity: createComunity.mutateAsync,
    promoteContactsToAdmin: promoteContactsToAdmin.mutateAsync,
    validatePhone: validatePhone.mutateAsync,
    requestLeadInCsv: requestLeadInCsv.mutateAsync,
    toggleGroups: toggleGroups.mutateAsync,
    deleteCommunity: deleteCommunity.mutateAsync,
  };
};

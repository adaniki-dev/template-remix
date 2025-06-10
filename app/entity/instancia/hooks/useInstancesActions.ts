import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type deleteInstanceTypes = {
  id: string;
};

type refreshInstanceTypes = {
  ids: string[];
};

export const useInstancesActions = () => {
  const queryClient = useQueryClient();

  const deleteInstanceById = useApiMutation<any, deleteInstanceTypes>(
    (variables) => `instance/logout?id=${variables.id}`,
    'delete',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['instances'],
        });
        toast.success('Instância deletada com sucesso');
      },
      onError: () => {
        toast.error('Erro ao deletar instância');
      },
    },
  );

  const refreshInstances = useApiMutation<any, refreshInstanceTypes>('instance/refresh', 'put', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['instances'],
      });
      toast.success('Instâncias atualizadas com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar instâncias');
    },
  });

  return {
    deleteInstanceById: deleteInstanceById.mutateAsync,
    refreshInstances: refreshInstances.mutateAsync,
  };
};

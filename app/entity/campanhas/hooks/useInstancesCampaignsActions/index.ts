import { useApiMutation } from '@/core/useAPI';
import {
  IBackupInstanceOnCampaign,
  IDeleteRemoveInstancesOnCampaign,
} from '@/features/campanhas/hooks/useInstancesCampaignsActions/types';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useInstancesCampaignsActions = () => {
  const queryClient = useQueryClient();

  const removeInstancesOnCampaign = useApiMutation<any, IDeleteRemoveInstancesOnCampaign>(
    '/campaigns/remove/instances',
    'delete',
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['InstancesCampaigns'],
        });
        toast.success('Instâncias removidas com sucesso');
      },
      onError: () => {
        toast.error('Desculpe, ocorreu um erro ao remover as instâncias');
      },
    },
  );

  const addBackupInstanceOnCampaign = useApiMutation<any, IBackupInstanceOnCampaign>(
    '/instance/backups',
    'put',
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['InstancesCampaigns'],
        });
        toast.success('Instância salva com sucesso');
      },
      onError: () => {
        toast.error('Desculpe, ocorreu um erro ao salvar a instância');
      },
    },
  );

  return {
    removeInstancesOnCampaign,
    addBackupInstanceOnCampaign,
  };
};

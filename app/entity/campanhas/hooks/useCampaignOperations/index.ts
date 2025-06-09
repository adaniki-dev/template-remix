import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type changeStrategy = {
  type: 'balanced' | 'sequential';
};

export function useCampaignOperations() {
  const queryClient = useQueryClient();
  const changeStrategy = useApiMutation<any, changeStrategy>('/campaigns/fill/strategy', 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const requestLeadInCsv = useApiMutation<any, { ids: string[] }>('/campaigns/leads-csv', 'post', {
    onSuccess: () => {
      toast.success('Pedido de leads enviado com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao enviar o pedido de leads');
    },
  });

  const deleteCampaigns = useApiMutation<any, { ids: string[] }>('/campaigns', 'delete', {
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Campanhas excluídas com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao excluir as campanhas');
    },
  });

  const strategyFillCampaigns = useApiMutation<
    any,
    { id: string; type: 'balanced' | 'sequential' }
  >((Variables) => `/campaigns/fill/strategy?campaignsId=${Variables.id}`, 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const editCampaigns = useApiMutation<
    any,
    { title: string; startedIn: string; finishedAt?: string; description: string; id: string }
  >('/campaigns', 'patch', {
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Campanha editada com sucesso');
    },
  });

  const addCampaigns = useApiMutation<
    any,
    {
      campaigns: {
        instances: string[];
        startedIn: string;
        finishedAt?: string;
        description: string;
        title: string;
      }[];
    }
  >('/campaigns', 'post', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Campanha criada com sucesso');
    },
    onError: () => {
      toast.error('Desculpe, ocorreu um erro ao criar a campanha');
    },
  });

  const addInstanceOnCampaign = useApiMutation<any, { campaignId: string; instances: string[] }>(
    '/campaigns/add/instances',
    'post',
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        toast.success('Instâncias adicionadas com sucesso');
      },
      onError: () => {
        toast.error('Desculpe, ocorreu um erro ao adicionar as instâncias');
      },
    },
  );

  return {
    changeStrategy: changeStrategy.mutateAsync,
    requestLeadInCsv: requestLeadInCsv.mutateAsync,
    deleteCampaigns: deleteCampaigns.mutateAsync,
    strategyFillCampaigns: strategyFillCampaigns.mutateAsync,
    editCampaigns: editCampaigns.mutateAsync,
    addCampaigns: addCampaigns.mutateAsync,
    addInstanceOnCampaign: addInstanceOnCampaign.mutateAsync,
  };
}

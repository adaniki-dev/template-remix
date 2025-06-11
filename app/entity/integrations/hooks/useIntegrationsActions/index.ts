import { useApiMutation } from '@/core/useAPI';
import { postCreateIntegration } from '@/features/integrations/hooks/useIntegrationsActions/types';
import { useQueryClient } from '@tanstack/react-query';

export const useIntegrationsActions = () => {
  const queryClient = useQueryClient();

  const createIntegrations = useApiMutation<any, postCreateIntegration>(
    
    'integrations/client',
    'post',

    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
          
        });
      },
    },
    
  );
  

  const editIntegrations = useApiMutation<
    any,
    {
      integrationsId: string;
      name: string;
      domain?: string;
    }
  >((variables) => `integrations/client/${variables.integrationsId}/name`, 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['integrations'],
      });
    },
  });

  const addingInstanceOnIntegration = useApiMutation<
    any,
    { clientIntegrationId: string | string[]; instance_ids: string[] }
  >('instances_integration', 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/integrations/instances'],
      });
    },
  });

  const deleteInstanceOnIntegration = useApiMutation<
    any,
    { client_integrations_instances_ids: string | string[] }
  >('instances_integration', 'delete', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/integrations/instances'],
      });
    },
  });

  return {
    createIntegrations: createIntegrations.mutateAsync,
    editIntegrations: editIntegrations.mutateAsync,
    addingInstanceOnIntegration: addingInstanceOnIntegration.mutateAsync,
    deleteInstanceOnIntegration: deleteInstanceOnIntegration.mutateAsync,
  };
};

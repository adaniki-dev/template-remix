import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';

export const useHooksActions = () => {
  const queryClient = useQueryClient();

  const changeMessageHook = useApiMutation<
    any,
    {
      hookId: string;
      message: string;
    }
  >((variables) => `config/hooks/${variables.hookId}/message`, 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hooksClientIntegrations'],
      });
    },
  });

  const integrationHooksStatusChangeClient = useApiMutation<any, { hookId: string }>(
    (variables) => `config/hooks/${variables.hookId}/toogle-status`,
    'patch',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
        });
      },
    },
  );

  const deleteHooksGroupsResponsible = useApiMutation<any, { numbers: any; hookId: string }>(
    (variables) => `hooks/client-integration/${variables.hookId}/groups`,
    'delete',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
        });
      },
    },
  );

  const deletePhoneNumbersResponsible = useApiMutation<any, { numbers: any; hookId: string }>(
    (variables) => `hooks/client-integration/${variables.hookId}/phones`,
    'delete',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
        });
      },
    },
  );

  const hookIntegrationToggleAdminStatus = useApiMutation<any, { hookId: string }>(
    (variables) => `config/hooks/${variables.hookId}/toogle-status`,
    'patch',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
        });
      },
    },
  );

  const addTemplateToHook = useApiMutation<any, { clientIntegrationId: string; hookId: string }>(
    'config/hooks/client-integration',
    'post',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['hooksClientIntegrations'],
        });
      },
    },
  );

  const swapGroupsAndNumbers = useApiMutation<
    any,
    { phones: string[]; groupsList: { id: string; name: string }[]; hookId: string }
  >((variables) => `config/hooks/client-integration/${variables.hookId}/phones/groups`, 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hooksClientIntegrations'],
      });
    },
  });

  return {
    changeMessageHook: changeMessageHook.mutateAsync,
    integrationHooksStatusChangeClient: integrationHooksStatusChangeClient.mutateAsync,
    deleteHooksGroupsResponsible: deleteHooksGroupsResponsible.mutateAsync,
    deletePhoneNumbersResponsible: deletePhoneNumbersResponsible.mutateAsync,
    hookIntegrationToggleAdminStatus: hookIntegrationToggleAdminStatus.mutateAsync,
    addTemplateToHook: addTemplateToHook.mutateAsync,
    swapGroupsAndNumbers: swapGroupsAndNumbers.mutateAsync,
  };
};

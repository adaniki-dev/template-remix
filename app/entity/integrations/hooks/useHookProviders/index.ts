import { useApiQuery } from '@/core/useAPI';

export const UseQueryTemplate = (integrationId: string, clientIntegrationId: string) => {
  return useApiQuery(
    ['templates'],
    `config/hooks/${integrationId}/integration/${clientIntegrationId}/client/integration`,
  );
};

export const UseQueryHooksClientIntegrations = (clientIntegrationId: string) => {
  return useApiQuery(
    ['hooksClientIntegrations'],
    `config/hooks/${clientIntegrationId}/client-integration`,
  );
};

export const UseQueryInterfaceGroupsNumber = () => {
  return useApiQuery(['interfaceGroupsNumber'], `instance/groups`);
};

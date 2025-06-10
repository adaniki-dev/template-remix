import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const getInstanceClient = async (instanceId: string) => {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: `instance/${instanceId}`,
  });
  return response;
};

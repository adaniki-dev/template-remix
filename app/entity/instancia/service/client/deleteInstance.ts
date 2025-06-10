import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const deleteInstanceByIdClient = async (instanceId: string) => {
  const response = await ClientAPIQuery({
    method: 'DELETE',
    path: `instance/${instanceId}`,
  });
  return response;
};

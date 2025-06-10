import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const postInstanceClient = async () => {
  const response = await ClientAPIQuery({
    method: 'POST',
    path: `instance`,
  });
  return response;
};

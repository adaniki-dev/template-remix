import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const getInstanceClient = async (instanceId: string) => {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: `qrcode/${instanceId}`,
  });
  return response;
};

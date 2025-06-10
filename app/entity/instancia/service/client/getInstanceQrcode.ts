import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const getInstanceQRcodeClient = async () => {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: `instance/qrcode`,
  });
  return response;
};

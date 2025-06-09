import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const getAttachments = async ({ type, index, relateid }: any) => {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: `support/attachments`,
    params: {
      type,
      index,
      relateid,
    },
  });
  return response;
};

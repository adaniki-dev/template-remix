import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const getMessageClient = async ({
  page = 1,
  pageSize = 50,
  type = '',
  startDate = '',
  endDate = '',
}: any) => {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: `messages`,
    params: {
      page,
      pageSize,
      type,
      startDate,
      endDate,
    },
  });
  return response;
};

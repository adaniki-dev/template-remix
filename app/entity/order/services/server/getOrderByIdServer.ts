import ServerSidePageController from '@/core/server/serverSidePageController';

export const getOrderByIdServer = async (orderId: string) => {
  const response = await ServerSidePageController({
    method: 'GET',
    path: `order/${orderId}`,
  });
  return response;
};

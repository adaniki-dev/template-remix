import ServerSidePageController from '@/core/server/serverSidePageController';

export const getContactServer = async () => {
  const response = await ServerSidePageController({
    method: 'GET',
    path: `users`,
  });
  return response;
};

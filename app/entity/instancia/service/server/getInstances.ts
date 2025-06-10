import ServerSidePageController from '@/core/server/serverSidePageController';

export const getInstancesServer = async () => {
  const response = await ServerSidePageController({
    method: 'GET',
    path: `instance/all`,
  });
  return response;
};

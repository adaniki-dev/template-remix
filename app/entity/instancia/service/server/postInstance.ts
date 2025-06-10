import ServerSidePageController from '@/core/server/serverSidePageController';

export const postInstanceServer = async () => {
  const response = await ServerSidePageController({
    method: 'POST',
    path: `instance`,
  });
  return response;
};

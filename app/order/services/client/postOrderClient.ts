import ClientAPIQuery from '@/hooks/ClientAPIQuery';

const postOrderClient = async () => {
  const response = ClientAPIQuery({
    method: 'POST',
    path: 'order',
  });
  return response;
};

export default postOrderClient;

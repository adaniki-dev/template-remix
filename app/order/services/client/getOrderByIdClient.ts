import ClientAPIQuery from '@/hooks/ClientAPIQuery';

const getOrderByIdClient = async (orderId: string) => {
  const response = ClientAPIQuery({
    method: 'GET',
    path: `order/${orderId}`,
  });
  return response;
};

export default getOrderByIdClient;

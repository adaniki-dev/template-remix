import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export async function getContactClient() {
  const response = await ClientAPIQuery({
    method: 'GET',
    path: 'contact',
  });
  return response;
}

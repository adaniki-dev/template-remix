import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export async function patchAddContactClient(body: any) {
  const response = await ClientAPIQuery({
    method: 'PATCH',
    path: 'contact',
    body,
  });
  return response;
}

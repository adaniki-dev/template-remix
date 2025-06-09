import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export const updateTicketByIdClient = async (ticketsId: any, body: any) => {
  const response = await ClientAPIQuery({
    method: 'PUT',
    path: `support/${ticketsId}`,
    body,
  });
  return response;
};

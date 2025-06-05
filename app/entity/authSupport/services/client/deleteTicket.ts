import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export type IDeleteTicket = {
  ticketId: string;
};

export const deleteTicket = async (ticketId: IDeleteTicket) => {
  const response = await ClientAPIQuery({
    method: 'DELETE',
    path: `support/${ticketId}`,
  });
  return response;
};

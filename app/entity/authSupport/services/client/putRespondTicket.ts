import ClientAPIQuery from '@/hooks/ClientAPIQuery';

export type IPutRespondTicket = {
  message: string;
};

export const respondTicketByIdClient = async (body: IPutRespondTicket) => {
  const response = await ClientAPIQuery({
    method: 'PUT',
    path: `support`,
    body,
  });
  return response;
};

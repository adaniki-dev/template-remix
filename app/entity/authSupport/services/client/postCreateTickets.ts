import ClientAPIQuery from '@/hooks/ClientAPIQuery';

// export type IPostCreateTicketClient = {
//     name: string,
//     email: string,
//     deptid: string,
//     priority: string,
//     subject: string,
//     message: string,
//     attachments: File,
//   };

export const postCreateTicket = async (body: any) => {
  const response = await ClientAPIQuery({
    method: 'POST',
    path: `support`,
    body,
  });
  return response;
};

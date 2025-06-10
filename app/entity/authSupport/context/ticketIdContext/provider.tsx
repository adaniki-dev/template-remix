'use client';

import { TicketContextByIdProvinder } from './context';
import { useApiQuery } from '@/core/useAPI';

export default function TicketByIdProviders({ children, ticketId }: any) {

  const queryResult = useApiQuery(['ticketsById'], `tickets/${ticketId}`)

  return (
    <TicketContextByIdProvinder queryTicketById={queryResult}>
      {children}
    </TicketContextByIdProvinder>
  );
}

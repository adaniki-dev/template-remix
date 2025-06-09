import { createContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

interface TicketProvidersProps {
  queryTickets: UseQueryResult<any, Error>;
  children: React.ReactNode;
}

interface TicketContextProps {
  queryTickets: any;
}

export const TicketContext = createContext<TicketContextProps>({
  queryTickets: {
    data: null,
  } as UseQueryResult<any, Error>,
});

export const TicketContextProvinder = ({ queryTickets, children }: TicketProvidersProps) => {
  return (
    <TicketContext.Provider
      value={{
        queryTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

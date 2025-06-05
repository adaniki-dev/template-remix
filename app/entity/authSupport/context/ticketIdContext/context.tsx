import { createContext } from 'react';

interface TicketByIdProvidersProps {
  queryTicketById: any;
  children: React.ReactNode;
}

interface TicketByIdContextProps {
  queryTicketById: any;
}

export const TicketByIdContext = createContext<TicketByIdContextProps>({
  queryTicketById: {} as any
});

export const TicketContextByIdProvinder = ({
  queryTicketById,
  children,
}: TicketByIdProvidersProps) => {
  return (
    <TicketByIdContext.Provider
      value={{
        queryTicketById,
      }}
    >
      {children}
    </TicketByIdContext.Provider>
  );
};

import { createContext } from 'react';

export const SummaryContext = createContext<any>({
  queryInstance: null,
  queryIntegration: null,
  queryMessage: null,
});

export const SummaryProvider = ({
  children,
  queryInstance,
  queryIntegration,
  queryMessage,
  queryContact,
}: any) => {
  return (
    <SummaryContext.Provider
      value={{
        queryInstance,
        queryIntegration,
        queryMessage,
        queryContact,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

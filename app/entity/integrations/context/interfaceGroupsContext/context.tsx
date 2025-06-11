'use client';

import { UseQueryInterfaceGroupsNumber } from '@/features/integrations/hooks/useHookProviders';
import { createContext } from 'react';

type InterfaceGroupsContextType = {
  interfaceGroupsNumberQueries: any;
};

export const InterfaceGroupsContext = createContext<InterfaceGroupsContextType>({
  interfaceGroupsNumberQueries: null,
});

export const InterfaceGroupProvider = ({ children }: any) => {
  const interfaceGroupsNumberQueries = UseQueryInterfaceGroupsNumber();

  const contextValue: InterfaceGroupsContextType = {
    interfaceGroupsNumberQueries: interfaceGroupsNumberQueries,
  };

  return (
    <InterfaceGroupsContext.Provider value={contextValue}>
      {children}
    </InterfaceGroupsContext.Provider>
  );
};

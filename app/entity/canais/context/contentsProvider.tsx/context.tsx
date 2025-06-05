'use client';
import React, { createContext } from 'react';

interface ContentsProvidersProps {
  children: React.ReactNode;
  queryContents: any;
}

interface ContentsContextProps {
  queryContents: any;
}

export const ContentsChannelContext = createContext<ContentsContextProps>({
  queryContents: {
    data: null,
  },
});

export const ContentsProvider = ({ children, queryContents }: ContentsProvidersProps) => {
  return (
    <ContentsChannelContext.Provider
      value={{
        queryContents,
      }}
    >
      {children}
    </ContentsChannelContext.Provider>
  );
};

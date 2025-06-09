'use client';
import { useApiQuery } from '@/core/useAPI';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext } from 'react';

interface ChannelProvidersProps {
  children: React.ReactNode;
}

interface ChannelContextProps {
  queryChannel: any;
}

export const ChannelContext = createContext<ChannelContextProps>({
  queryChannel: {
    data: null,
  },
});

export const ChannelProvider = ({ children }: ChannelProvidersProps) => {
  const params = useParams();

  const queryChannel = useApiQuery(['/newsletter/{id}'], `newsletter/${params.newsletterId}`);
  return (
    <ChannelContext.Provider
      value={{
        queryChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

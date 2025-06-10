'use client';
import { useApiQuery } from '@/core/useAPI';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext } from 'react';

interface ChannelsProvidersProps {
  children: React.ReactNode;
}

interface ChannelsContextProps {
  queryChannels: any;
  queryInstances: any;
}

export const ChannelsContext = createContext<ChannelsContextProps>({
  queryChannels: {
    data: null,
  },
  queryInstances: null,
});

const CHANNELS_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    order: 'desc',
    search: '',
  },
  allowedParams: ['page', 'perPage', 'order', 'search', 'campaignsId'],
};

export const ChannelsProvider = ({ children }: ChannelsProvidersProps) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CHANNELS_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('/newsletter', paramsUrl, paramsOrganizer);
  const queryChannels = useApiQuery(createQueryKeyWithParams(['/newsletter'], paramsUrl), url);
  const queryInstances = useApiQuery<any>(['instances'], 'instance/all');
  return (
    <ChannelsContext.Provider
      value={{
        queryChannels,
        queryInstances,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};

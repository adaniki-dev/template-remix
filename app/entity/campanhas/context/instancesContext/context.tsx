'use client';
import { useApiQuery } from '@/core/useAPI';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext } from 'react';

interface InstanceProvidersProps {
  children: React.ReactNode;
}

interface InstanceContextProps {
  queryInstances: any;
}

export const CampaignsInstancesContext = createContext<InstanceContextProps>({
  queryInstances: {
    data: null,
  },
});

const CAMPAIGN_INSTANCE_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    orderBy: 'desc',
    search: '',
  },
  allowedParams: ['page', 'perPage', 'orderBy', 'search', 'campaignsId'],
};

export const CampaignsInstancesProvider = ({ children }: InstanceProvidersProps) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CAMPAIGN_INSTANCE_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('instance/all/campaign', paramsUrl, paramsOrganizer);
  const queryInstances = useApiQuery(
    createQueryKeyWithParams(['InstancesCampaigns'], paramsUrl),
    url,
  );

  return (
    <CampaignsInstancesContext.Provider
      value={{
        queryInstances,
      }}
    >
      {children}
    </CampaignsInstancesContext.Provider>
  );
};

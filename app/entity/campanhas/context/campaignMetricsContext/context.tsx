'use client';
import { useApiQuery } from '@/core/useAPI';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { UseQueryResult } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext } from 'react';

interface MetricsCampaignsProviderProps {
  children: React.ReactNode;
}

interface MetricsCampaignProps {
  queryMetrics: UseQueryResult<any, Error>;
}

export const MetricsCampaignContext = createContext<MetricsCampaignProps>({
  queryMetrics: {
    data: null,
  } as UseQueryResult<any, Error>,
});

const CAMPAIGN_METRICS_PARAMS_CONFIG = {
  defaultValues: {
    order: 'asc',
    since: '90',
  },
  allowedParams: ['order', 'since', 'campaignsId', 'startDate', 'endDate'],
};

export const MetricsCampaignsProvider = ({ children }: MetricsCampaignsProviderProps) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CAMPAIGN_METRICS_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('/campaigns/metrics', paramsUrl, paramsOrganizer);
  const queryMetrics = useApiQuery(
    createQueryKeyWithParams(['/campaigns/metrics'], paramsUrl),
    url,
  );

  return (
    <MetricsCampaignContext.Provider
      value={{
        queryMetrics,
      }}
    >
      {children}
    </MetricsCampaignContext.Provider>
  );
};

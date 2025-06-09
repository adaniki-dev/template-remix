'use client';

import { CampaignsProvider } from './context';
import { useParams, useSearchParams } from 'next/navigation';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useApiQuery } from '@/core/useAPI';

interface CampaignsProvidersProps {
  children: React.ReactNode;
  searchParams: any;
  params: any;
}

const CAMPAIGN_LIST_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    orderBy: 'desc',
    search: '',
  },
  allowedParams: ['page', 'perPage', 'orderBy', 'search'],
};

export function CampaignsProviders({ children }: CampaignsProvidersProps) {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CAMPAIGN_LIST_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('/campaigns/search', paramsUrl, paramsOrganizer);
  const queryCampains = useApiQuery(createQueryKeyWithParams(['campaigns'], paramsUrl), url);

  const { data: queryInstances } = useApiQuery<any>(['instances'], 'instance/all');

  return (
    <CampaignsProvider queryCampains={queryCampains} queryInstances={queryInstances}>
      {children}
    </CampaignsProvider>
  );
}

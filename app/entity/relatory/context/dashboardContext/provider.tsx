'use client';
import { DashboardProvider } from './context';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useApiQuery } from '@/core/useAPI';

import { useParams, useSearchParams } from 'next/navigation';

interface DashboardProvidersProps {
  children: React.ReactNode;
}

const MESSAGES_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    type: '',
    startDate: '',
    endDate: '',
  },
  allowedParams: ['page', 'perPage', 'type', 'startDate', 'endDate'],
};

export function DashboardProviders({ children }: DashboardProvidersProps) {
  const searchParams = useSearchParams();
  const paramsOrganizer = createQueryParamsOrganizer(MESSAGES_PARAMS_CONFIG);
  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
  });
  const url = buildUrlWithParams('/messages', paramsUrl, paramsOrganizer);
  const queryGroups = useApiQuery(createQueryKeyWithParams(['/messages'], paramsUrl), url);

  return <DashboardProvider queriesOptions={queryGroups}>{children}</DashboardProvider>;
}

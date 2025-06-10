'use client';
import { ContentsProvider } from './context';
import { useParams, useSearchParams } from 'next/navigation';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useApiQuery } from '@/core/useAPI';

interface ContentsProvidersProps {
  children: React.ReactNode;
}

const CHANNEL_CONTENTS_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    orderBy: 'desc',
    search: '',
    searchOrderBy: 'asc',
  },
  allowedParams: ['page', 'perPage', 'orderBy', 'search', 'searchOrderBy', 'newsletterId'],
};

export function ContentsChannelProviders({ children }: ContentsProvidersProps) {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CHANNEL_CONTENTS_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    newsletterId: params.newsletterId,
  });

  const url = buildUrlWithParams('/contents/search', paramsUrl, paramsOrganizer);
  const queryContents = useApiQuery(createQueryKeyWithParams(['contents'], paramsUrl), url);

  return <ContentsProvider queryContents={queryContents}>{children}</ContentsProvider>;
}

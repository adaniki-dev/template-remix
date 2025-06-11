'use client';

import React, { createContext } from 'react';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useParams, useSearchParams } from 'next/navigation';
import { useApiQuery } from '@/core/useAPI';

interface IntegrationInstanceByIdProvidersProps {
  children: React.ReactNode;
}

interface IntegrationInstanceByIdContextProps {
  queryIntegrationInstances: any;
}

export const IntegrationInstanceByIdContext = createContext<IntegrationInstanceByIdContextProps>({
  queryIntegrationInstances: {
    data: null,
  },
});

const INTEGRATION_INSTANCE_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    pageSize: '10',
    totalCount: '10',
    totalPages: '1',
  },
  allowedParams: ['page', 'pageSize', 'totalCount', 'totalPages'],
};

export const IntegrationInstanceByIdProvider = ({
  children,
}: IntegrationInstanceByIdProvidersProps) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(INTEGRATION_INSTANCE_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });
  const url = buildUrlWithParams(
    `instances_integration/${params?.clientIntegrationId}`,
    paramsUrl,
    paramsOrganizer,
  );

  const queryIntegrationInstances = useApiQuery(
    createQueryKeyWithParams(
      [`/integrations/instances`, `${params?.clientIntegrationId}`],
      paramsUrl,
    ),
    url,
  );

  return (
    <IntegrationInstanceByIdContext.Provider
      value={{
        queryIntegrationInstances,
      }}
    >
      {children}
    </IntegrationInstanceByIdContext.Provider>
  );
};

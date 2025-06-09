'use client';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext } from 'react';

interface CampaignsProvidersProps {
  queryCampains: UseQueryResult<any, Error>;
  queryInstances: UseQueryResult<any, Error>;
  children: React.ReactNode;
}

interface CampaignsContextProps {
  queryCampains: UseQueryResult<any, Error>;
  queryInstances: UseQueryResult<any, Error>;
  findCampaignById: (id: string) => any;
}

export const CampaignsContext = createContext<CampaignsContextProps>({
  queryCampains: {
    data: null,
  } as UseQueryResult<any, Error>,
  queryInstances: {
    data: null,
  } as UseQueryResult<any, Error>,
  findCampaignById: () => {},
});

export const CampaignsProvider = ({
  children,
  queryCampains,
  queryInstances,
}: CampaignsProvidersProps) => {
  const findCampaignById = (id: string) => {
    return queryCampains?.data?.data?.find((item: any) => item.id === id);
  };

  return (
    <CampaignsContext.Provider
      value={{
        queryCampains,
        queryInstances,
        findCampaignById,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};

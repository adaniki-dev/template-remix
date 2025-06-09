'use client';
import { UseQueryResult } from '@tanstack/react-query';
import React, { createContext } from 'react';

interface CampaignsByIdProvidersProps {
  queryCampaignsById: UseQueryResult<any, Error>;
  campaignsId: string;
  children: React.ReactNode;
}

interface CampaignsByIdContextProps {
  queryCampaignsById: UseQueryResult<any, Error>;
  campaignsId: string;
}

export const CampaignsByIdContext = createContext<CampaignsByIdContextProps>({
  queryCampaignsById: {
    data: null,
  } as UseQueryResult<any, Error>,
  campaignsId: '',
});

export const CampaignsByIdProvider = ({
  children,
  queryCampaignsById,
  campaignsId,
}: CampaignsByIdProvidersProps) => {
  return (
    <CampaignsByIdContext.Provider
      value={{
        queryCampaignsById,
        campaignsId,
      }}
    >
      {children}
    </CampaignsByIdContext.Provider>
  );
};

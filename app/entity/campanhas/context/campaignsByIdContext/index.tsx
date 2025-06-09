'use client';
import { useContext } from 'react';
import { CampaignsByIdContext } from './context';

export function useCampaignsByIdContext() {
  const context = useContext(CampaignsByIdContext);

  if (context === undefined) {
    throw new Error('useCampaignsContext must be used within a CampaignsProviders');
  }
  return context;
}

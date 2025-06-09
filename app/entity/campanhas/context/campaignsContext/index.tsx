'use client';
import { useContext } from 'react';
import { CampaignsContext } from './context';

export function useCampaignsContext() {
  const context = useContext(CampaignsContext);

  if (context === undefined) {
    throw new Error('useCampaignsContext must be used within a CampaignsProviders');
  }
  return context;
}

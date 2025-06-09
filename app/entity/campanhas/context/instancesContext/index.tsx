'use client';
import { CampaignsInstancesContext } from '@/features/campanhas/context/instancesContext/context';
import { useContext } from 'react';

export function useCampaignsInstancesContext() {
  const context = useContext(CampaignsInstancesContext);

  if (context === undefined) {
    throw new Error(
      'useCampaignsInstancesContext must be used within a CampaignsInstancesProvider',
    );
  }
  return context;
}

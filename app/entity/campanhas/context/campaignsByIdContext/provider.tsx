'use client';
import { CampaignsByIdProvider } from './context';
import { useApiQuery } from '@/core/useAPI';
interface CampaignsProvidersProps {
  children: React.ReactNode;
  campaignsId: string;
}

export function CampaignsByIdProviders({ children, campaignsId }: CampaignsProvidersProps) {
  const queryCampaignsById = useApiQuery(
    ['campaignsById', campaignsId],
    `/campaigns?id=${campaignsId}`,
  );
  return (
    <CampaignsByIdProvider queryCampaignsById={queryCampaignsById} campaignsId={campaignsId}>
      {children}
    </CampaignsByIdProvider>
  );
}

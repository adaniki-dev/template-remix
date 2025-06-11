import { MetricsCampaignContext } from '@/features/campanhas/context/campaignMetricsContext/context';
import { useContext } from 'react';

export function useCampaignMetrics() {
  const context = useContext(MetricsCampaignContext);
  if (context === undefined) {
    throw new Error('useCampaignMetrics must be used within a MetricsCampaignsProvider');
  }
  return context;
}

import MetricsContainer from '@/features/campanhas/components/metricsContainer';
import { MetricsCampaignsProvider } from '@/features/campanhas/context/campaignMetricsContext/context';

export default async function CampaignsByIdMetricsPage() {
  return (
    <MetricsCampaignsProvider>
      <MetricsContainer />
    </MetricsCampaignsProvider>
  );
}

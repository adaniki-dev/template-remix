'use client';
import CardMetricSkeleton from '@/components/ui-modified/loading/cardMetricSkeleton';
import GroupCapacityChart from '@/features/campanhas/components/metricsContainer/components/charts/capacityChart';
import { CapacityLimitsCard } from '@/features/campanhas/components/metricsContainer/components/charts/capacityLimitsCard';
import { HistoricalTrendChart } from '@/features/campanhas/components/metricsContainer/components/charts/historicalTendency';
import { MembersDistributionChart } from '@/features/campanhas/components/metricsContainer/components/charts/membarDistributionChart';
import { MetricCardContainer } from '@/features/campanhas/components/metricsContainer/components/MetricCardContainer';
import MetricsHomeHeader from '@/features/campanhas/components/metricsContainer/components/metricsHeader';
import { FilterMetricsPopover } from '@/features/campanhas/components/metricsContainer/components/metricsHeader/filterMetricsPopover';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import { useSearchParams } from 'next/navigation';

export default function MetricsContainer() {
  const { isLoading } = useCampaignMetrics().queryMetrics;
  const searchParams = useSearchParams();
  const since = searchParams.get('since') || '90';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  function getLegendText(since: string, startDate: string, endDate: string): string {
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString('pt-BR');
      const end = new Date(endDate).toLocaleDateString('pt-BR');
      return `período ${start} até ${end}`;
    }

    const periodMap: Record<string, string> = {
      '7': 'últimos 7 dias',
      '15': 'últimos 15 dias',
      '30': 'últimos 30 dias',
      '60': 'últimos 60 dias',
      '90': 'últimos 90 dias',
    };

    return periodMap[since] || `últimos ${since} dias`;
  }



  return (
    <div className="grid w-full overflow-hidden lg:grid-rows-[56px_1fr] p-4 gap-4">
      <MetricsHomeHeader />
      {isLoading ? (
        <CardMetricSkeleton/>
      ) : (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          <GroupCapacityChart />
          <CapacityLimitsCard />
          <MembersDistributionChart />
        </div>
        <MetricCardContainer />
        <div className="flex gap-2 items-center">
          <h2 className=" font-medium">Métricas por {getLegendText(since, startDate, endDate)}</h2>{' '}
          <FilterMetricsPopover />
        </div>
        <HistoricalTrendChart />
      </div>
      )}
    </div>
  );
}

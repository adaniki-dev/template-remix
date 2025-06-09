import { Skeleton } from '@/components/ui/skeleton';
import { MetricCard } from '@/features/campanhas/components/metricsContainer/components/charts/metricsCharts';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import {
  BarChart3,
  Gauge,
  LogOut,
  MessageCircle,
  MousePointerClick,
  Users,
  UsersRound,
} from 'lucide-react';

export const MetricCardContainer = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;


  if (isError || !analyticsData) {
    return <div>Erro ao carregar dados</div>;
  }

  const getLatestTrendValue = (metricType: string): number | null => {
    try {
      const growthRates = analyticsData.historicalAnalysis?.[metricType]?.growthRate;
      if (!growthRates) return null;

      const dates = Object.keys(growthRates).sort();
      return dates.length > 0 ? growthRates[dates[dates.length - 1]] : null;
    } catch (error) {
      console.error(`Error getting trend value for ${metricType}:`, error);
      return null;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 gap-4">
      {analyticsData && 'groupEntryCount' in analyticsData && (
        <MetricCard
          title="Entradas em Grupos"
          value={analyticsData.groupEntryCount}
          icon={Users}
          trend
          trendValue={getLatestTrendValue('group_entry_count')}
          helpText="Número de entradas em grupos de usuários no período"
        />
      )}
      {analyticsData && 'groupExitCount' in analyticsData && (
        <MetricCard
          title="Saídas de Grupos"
          value={analyticsData.groupExitCount}
          icon={LogOut}
          trend
          trendValue={getLatestTrendValue('group_exit_count')}
          helpText="Número de saídas de grupos de usuários no período"
        />
      )}

      {analyticsData &&
        'conversion' in analyticsData &&
        'retentionRate' in analyticsData.conversion && (
          <MetricCard
            title="Retenção"
            value={analyticsData.conversion.retentionRate}
            icon={UsersRound}
            percentage
            helpText="Taxa de retenção de usuários. Quanto maior a taxa, melhor."
          />
        )}
      {analyticsData &&
        'conversion' in analyticsData &&
        'churnRate' in analyticsData.conversion && (
          <MetricCard
            title="Taxa de Churn"
            value={analyticsData.conversion.churnRate.value}
            icon={Users}
            helpText="Taxa de Churn representa a frequência de rotatividade de entrada e saída. Quanto menor a taxa, melhor. Com um valor de 0 a 1"
            label={analyticsData.conversion.churnRate.interpretation}
          />
        )}
      {analyticsData &&
        'groupStats' in analyticsData &&
        'systemPressure' in analyticsData.groupStats && (
          <MetricCard
            title="Índice de Pressão do Sistema (IPS)"
            value={analyticsData.groupStats.systemPressure.value}
            icon={Gauge}
            helpText="O Índice de Pressão do Sistema (IPS) é uma métrica que indica a pressão que a campanha está sofrendo por falta de grupos. Quanto maior o valor, maior a pressão. Com um valor de 0 a 1"
            label={analyticsData.groupStats.systemPressure.interpretation}
          />
        )}
      {analyticsData &&
        'groupStats' in analyticsData &&
        'commercialCapacity' in analyticsData.groupStats && (
          <MetricCard
            title="Score de Capacidade Comercial (SCC)"
            value={analyticsData.groupStats.commercialCapacity.value}
            icon={BarChart3}
            helpText="O Score de Capacidade Comercial (SCC) é uma métrica que avalia o potencial comercial da campanha indicando potencial de crescimento e performance. Quanto maior o valor, maior a performance. Com um valor de 0 a 100"
            label={analyticsData.groupStats.commercialCapacity.interpretation}
          />
        )}
      {/* {analyticsData &&
        'sendedMessageMediaCount' in analyticsData &&
        'sendedMessageTextCount' in analyticsData && (
          <MetricCard
            title="Total de Mensagens"
            value={analyticsData.sendedMessageTextCount + analyticsData.sendedMessageMediaCount}
            icon={MessageCircle}
          />
        )} */}
    </div>
  );
};

export default MetricCard;

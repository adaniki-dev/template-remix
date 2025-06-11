import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend, Label } from 'recharts';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import { Skeleton } from '@/components/ui/skeleton';
import CardMetricSkeleton from '@/components/ui-modified/loading/cardMetricSkeleton';

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
  }>;
}

const COLORS = {
  closed: 'hsl(221, 66%, 20%)',
  critical: 'hsl(251, 66%, 40%)',
  almostFull: 'hsl(221, 66%, 50%)',
  available: 'hsl(191, 66%, 65%)',
  withoutLimit: 'hsl(221, 66%, 80%)',
} as const;

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-2 border rounded-lg shadow-lg min-w-[200px]">
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.color }} />
            <div className="flex justify-between w-full">
              <span className="text-sm font-medium">{item.payload.name}</span>
              <span className="text-sm">{item.payload.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GroupCapacityChart: React.FC = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;

  const { chartData, totalGroups } = useMemo(() => {
    if (!analyticsData?.groupStats?.capacity) {
      return { chartData: [], totalGroups: 0 };
    }

    const { capacity } = analyticsData.groupStats;
    const total =
      capacity.closed +
      capacity.critical +
      capacity.almostFull +
      capacity.available +
      capacity.withoutLimit;

    const data = [
      { name: 'Fechado', value: capacity.closed, color: COLORS.closed },
      { name: 'Crítico', value: capacity.critical, color: COLORS.critical },
      { name: 'Quase cheio', value: capacity.almostFull, color: COLORS.almostFull },
      { name: 'Disponível', value: capacity.available, color: COLORS.available },
      { name: 'Sem limite', value: capacity.withoutLimit, color: COLORS.withoutLimit },
    ]
      .filter((item) => item.value > 0)
      .map((item) => ({
        ...item,
        percentage: (item.value / total) * 100,
      }));

    return { chartData: data, totalGroups: total };
  }, [analyticsData]);

  if (isError || !analyticsData) {
    return (
      <Card className="w-full">
        <CardContent className="h-64 flex items-center justify-center">
          <span>Erro ao carregar dados</span>
        </CardContent>
      </Card>
    );
  }
  

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Capacidade dos Grupos</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Distribuição por status</span>
          <span className="text-sm font-medium">
            Total: {totalGroups} {totalGroups === 1 ? 'grupo' : 'grupos'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={1} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 4}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalGroups}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                          className="fill-muted-foreground"
                        >
                          Grupos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GroupCapacityChart;

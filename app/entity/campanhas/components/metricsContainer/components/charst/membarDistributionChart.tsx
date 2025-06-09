'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import { Skeleton } from '@/components/ui/skeleton';

const CHART_COLOR = 'hsl(221, 66%, 45%)';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-2 border rounded shadow-lg">
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm">
        {payload[0].value.toLocaleString()} {payload[0].value === 1 ? 'membro' : 'membros'}
      </p>
    </div>
  );
};

export const MembersDistributionChart: React.FC = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;

  const { chartData, totalMembers } = useMemo(() => {
    if (!analyticsData?.groupStats?.members) {
      return { chartData: [], totalMembers: 0 };
    }

    const { members } = analyticsData.groupStats;

    return {
      chartData: [
        {
          name: 'Mínimo',
          value: members.minInGroup,
          description: 'Menor grupo',
        },
        {
          name: 'Média',
          value: Math.round(members.average),
          description: 'Média por grupo',
        },
        {
          name: 'Máximo',
          value: members.maxInGroup,
          description: 'Maior grupo',
        },
      ],
      totalMembers: members.total,
    };
  }, [analyticsData]);

  if (isLoading) {
    return <Skeleton className="w-full h-62" />;
  }

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
        <CardTitle>Distribuição de Membros</CardTitle>
        <CardDescription>
          Total: {totalMembers.toLocaleString()} {totalMembers === 1 ? 'membro' : 'membros'}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={40}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis width={45} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill={CHART_COLOR}
              radius={[4, 4, 0, 0]}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="px-6 pb-4">
        <dl className="grid grid-cols-3 gap-4 text-sm">
          {chartData.map((item) => (
            <div key={item.name} className="text-center">
              <dt className="text-muted-foreground">{item.description}</dt>
              <dd className="font-medium mt-1">{item.value?.toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
};

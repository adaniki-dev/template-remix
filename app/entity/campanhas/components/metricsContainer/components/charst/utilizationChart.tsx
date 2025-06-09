'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';

interface ChartConfig {
  withLimit: {
    label: string;
    color: string;
  };
  withoutLimit: {
    label: string;
    color: string;
  };
}

const COLORS = {
  withLimit: 'hsl(221, 66%, 45%)',
  withoutLimit: 'hsl(221, 66%, 25%)',
} as const;

const chartConfig: ChartConfig = {
  withLimit: {
    label: 'Com Limite',
    color: COLORS.withLimit,
  },
  withoutLimit: {
    label: 'Sem Limite',
    color: COLORS.withoutLimit,
  },
};

export const UtilizationChart: React.FC = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;

  const chartData = useMemo(() => {
    if (!analyticsData?.groupStats) return [];

    const { utilization, totalGroups } = analyticsData.groupStats;
    return [
      {
        withLimit: utilization.groupsWithLimit,
        withoutLimit: totalGroups - utilization.groupsWithLimit,
      },
    ];
  }, [analyticsData]);

  const averageUtilization = useMemo(() => {
    if (!analyticsData?.groupStats?.utilization) return 0;
    return analyticsData.groupStats.utilization.averageUtilization;
  }, [analyticsData]);

  const totalGroups = useMemo(() => {
    if (!analyticsData?.groupStats) return 0;
    return analyticsData.groupStats.totalGroups;
  }, [analyticsData]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="h-64 flex items-center justify-center">
          <span>Carregando...</span>
        </CardContent>
      </Card>
    );
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
        <CardTitle>Utilização dos Grupos</CardTitle>
        <CardDescription>Média de utilização: {averageUtilization.toFixed(1)}%</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              endAngle={360}
              startAngle={0}
              innerRadius={80}
              outerRadius={130}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalGroups}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Grupos
                        </tspan>
                      </text>
                    );
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="withLimit"
                cornerRadius={5}
                fill={COLORS.withLimit}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="withoutLimit"
                fill={COLORS.withoutLimit}
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <div className="flex justify-center gap-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.withLimit }} />
          <span className="text-sm">Com Limite</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.withoutLimit }} />
          <span className="text-sm">Sem Limite</span>
        </div>
      </div>
    </Card>
  );
};

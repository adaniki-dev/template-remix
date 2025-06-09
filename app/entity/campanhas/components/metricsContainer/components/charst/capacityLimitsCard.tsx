import React, { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarRadiusAxis,
  Label,
  Tooltip,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartData {
  name: string;
  usado: number;
  livre: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string | number;
    payload: ChartData;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white p-2 border rounded-lg shadow-lg space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{ background: 'rgb(37, 99, 235)' }}></span>
        <p className="text-sm font-medium">Vagas Usadas</p>
        <p className="text-sm ml-1">{Math.round(data.usado)}%</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full" style={{ background: 'rgb(229, 231, 235)' }}></span>
        <p className="text-sm font-medium">Vagas Livres</p>
        <p className="text-sm ml-1">{Math.round(data.livre)}%</p>
      </div>
    </div>
  );
};

export const CapacityLimitsCard = () => {
  const { data: value, isLoading, isError } = useCampaignMetrics().queryMetrics;

  const { remainingPercentage, usedCapacity, totalCapacity, remainingSpots, isLowCapacity } =
    useMemo(() => {
      if (!value?.groupStats?.limits) {
        return {
          remainingPercentage: 0,
          usedCapacity: 0,
          totalCapacity: 0,
          remainingSpots: 0,
          isLowCapacity: false,
        };
      }

      const { remainingSpots, totalCapacity } = value.groupStats.limits;
      const usedCapacity = totalCapacity - remainingSpots;
      const remainingPercentage = (remainingSpots / totalCapacity) * 100;
      const isLowCapacity = remainingPercentage < 20;

      return {
        remainingPercentage,
        usedCapacity,
        totalCapacity,
        remainingSpots,
        isLowCapacity,
      };
    }, [value]);

  const chartData = useMemo(() => {
    return [
      {
        name: 'Capacidade',
        usado: ((totalCapacity - remainingSpots) / totalCapacity) * 100,
        livre: (remainingSpots / totalCapacity) * 100,
      },
    ];
  }, [totalCapacity, remainingSpots]);

  if (isLoading) {
    return <Skeleton className="w-full h-62" />;
  }

  if (isError || !value) {
    return (
      <Card className="w-full">
        <CardContent className="flex h-64 items-center justify-center">
          <span>Erro ao carregar dados</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Limites de Capacidade</CardTitle>
        <CardDescription>
          {remainingSpots.toLocaleString()}{' '}
          {remainingSpots === 1 ? 'vaga restante' : 'vagas restantes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={chartData}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={130}
                barSize={20}
              >
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {usedCapacity.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Vagas Usadas
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <RadialBar
                  dataKey="usado"
                  name="Vagas Usadas"
                  fill={isLowCapacity ? 'rgb(239, 68, 68)' : 'rgb(37, 99, 235)'}
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="livre"
                  name="Vagas Livres"
                  fill="rgb(229, 231, 235)"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between text-sm">
            <span>Usado: {usedCapacity.toLocaleString()}</span>
            <span>Total: {totalCapacity.toLocaleString()}</span>
          </div>

          {isLowCapacity && (
            <Alert variant="destructive">
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Menos de 20% da capacidade total disponível ({Math.round(remainingPercentage)}%
                restante)
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground">
            <p>
              Taxa de ocupação:{' '}
              <span className="font-medium">{Math.round(100 - remainingPercentage)}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacityLimitsCard;

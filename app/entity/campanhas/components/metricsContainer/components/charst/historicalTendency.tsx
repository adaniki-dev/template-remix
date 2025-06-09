'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = {
  entradas: '#4CAF50',
  saidas: '#f44336',
  cliques: '#2196F3',
} as const;

const LABELS = {
  entradas: 'Entradas',
  saidas: 'Saídas',
  cliques: 'Cliques',
} as const;

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-xl">
      <div className="font-medium mb-2 pb-1 border-b border-white/20">{label}</div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className="">{LABELS[entry.dataKey as keyof typeof LABELS]}</span>
            <span className="ml-auto font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HistoricalTrendChart: React.FC = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;

  const chartData = useMemo(() => {
    // Validação inicial dos dados
    if (!analyticsData?.historicalAnalysis) return [];

    // Validação das propriedades necessárias
    const groupEntryData = analyticsData.historicalAnalysis.group_entry_count?.dailyNetChange;
    const groupExitData = analyticsData.historicalAnalysis.group_exit_count?.dailyNetChange;
    const linkClickData = analyticsData.historicalAnalysis.invite_link_click_count?.dailyNetChange;

    // Se algum dos dados necessários estiver faltando, retorne array vazio
    if (!groupEntryData || !groupExitData || !linkClickData) {
      console.warn('Dados históricos incompletos ou malformados');
      return [];
    }

    // Coleta todas as datas únicas
    const allDates = new Set([
      ...Object.keys(groupEntryData),
      ...Object.keys(groupExitData),
      ...Object.keys(linkClickData),
    ]);

    return Array.from(allDates)
      .sort((a, b) => {
        try {
          const [dayA, monthA, yearA] = a.split('-').map(Number);
          const [dayB, monthB, yearB] = b.split('-').map(Number);

          // Validação das datas
          if (
            isNaN(dayA) ||
            isNaN(monthA) ||
            isNaN(yearA) ||
            isNaN(dayB) ||
            isNaN(monthB) ||
            isNaN(yearB)
          ) {
            console.warn('Formato de data inválido encontrado');
            return 0;
          }

          return (
            new Date(yearA, monthA - 1, dayA).getTime() -
            new Date(yearB, monthB - 1, dayB).getTime()
          );
        } catch (error) {
          console.error('Erro ao processar datas:', error);
          return 0;
        }
      })
      .map((date) => {
        try {
          const [day, month] = date.split('-');
          return {
            date: `${day}/${month}`,
            entradas: groupEntryData[date] || 0,
            saidas: groupExitData[date] || 0,
            cliques: linkClickData[date] || 0,
          };
        } catch (error) {
          console.error('Erro ao processar dados para a data:', date, error);
          return {
            date: 'Invalid',
            entradas: 0,
            saidas: 0,
            cliques: 0,
          };
        }
      })
      .filter((item) => item.date !== 'Invalid'); // Remove dados inválidos
  }, [analyticsData]);

  if (isLoading) {
    return <Skeleton className="w-full h-62" />;
  }

  if (isError || !analyticsData) {
    return (
      <Card className="col-span-2">
        <CardContent className="h-80 flex items-center justify-center">
          <span>Erro ao carregar dados</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tendências Históricas</CardTitle>
        <CardDescription>Entradas, saídas e cliques por dia</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-200" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgb(255,255,255,0.2)', strokeWidth: 1 }}
            />

            <Line
              type="monotone"
              dataKey="entradas"
              stroke={COLORS.entradas}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Line
              type="monotone"
              dataKey="saidas"
              stroke={COLORS.saidas}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            {/* <Line
              type="monotone"
              dataKey="cliques"
              stroke={COLORS.cliques}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrendChart;

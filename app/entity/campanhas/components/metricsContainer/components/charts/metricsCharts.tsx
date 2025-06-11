import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, HelpCircle, LucideIcon } from 'lucide-react';
import React, { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: boolean;
  trendValue?: number | null;
  historicalData?: Record<string, number>;
  percentage?: boolean;
  helpText?: string;
  label?: string;
}

interface TrendInfo {
  show: boolean;
  isPositive: boolean;
  value: number;
  color: string;
}

const formatValue = (value: number): string => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  return value.toString();
};

const getTrendInfo = (trendValue: number | null | undefined): TrendInfo | null => {
  if (trendValue === null || trendValue === undefined) {
    return null;
  }

  return {
    show: true,
    isPositive: trendValue >= 0,
    value: Math.abs(trendValue),
    color: trendValue >= 0 ? 'text-green-500' : 'text-red-500',
  };
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend = false,
  trendValue,
  historicalData,
  percentage = false,
  helpText,
  label,
}) => {
  const formattedValue = useMemo(() => formatValue(value), [value]);
  const trendInfo = useMemo(() => getTrendInfo(trendValue), [trendValue]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {helpText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent className="w-64 bg-white text-foreground shadow-md">
                <p className="text-sm  text-wrap text-start ">{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {formattedValue} {percentage ? '%' : ''}
          </div>
          {trend && trendInfo && (
            <div className={`flex items-center gap-1 text-xs ${trendInfo.color}`}>
              {trendInfo.isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span>{trendInfo.value.toFixed(1)}%</span>
            </div>
          )}
          {historicalData && Object.keys(historicalData).length > 0 && (
            <div className="text-xs text-muted-foreground">
              Últimos dados:{' '}
              {Object.entries(historicalData)
                .slice(-3)
                .map(([date, val]) => `${date}: ${val}`)
                .join(', ')}
            </div>
          )}
          {label && <div className="text-xs text-muted-foreground">{label}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

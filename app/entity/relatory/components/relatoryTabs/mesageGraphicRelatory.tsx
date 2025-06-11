'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraphComponent } from '@/features/relatory/components/graphs';
import FilterButton from '@/features/relatory/components/relatoryTabs/filterButton';

export default function MessageGraphicRelatory({ data, days }: any) {
  const chartData = data && data.chart ? data.chart : [];
  return (
    <Card>
      <CardHeader title="Gráfico de mensagens">
        <CardTitle className="w-fsull flex item justify-between">
          <div className="flex justify-between w-full items-center">
            Mensagens nos últimos {days} dias
            <FilterButton />
          </div>
        </CardTitle>
        <CardDescription>Total de mensagens: {data?.total}</CardDescription>
      </CardHeader>
      <CardContent>
        <GraphComponent chartData={chartData} />
      </CardContent>
    </Card>
  );
}

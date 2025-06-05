'use client';

import { CardHeader } from '@/components/ui/card';
import LineChartMessages from '@/features/relatory/components/graphs/lineChart';

export default function MessageGraphic({ data, days }: any) {
  const chartData = data && data.chart ? data.chart : [];
  return (
    <div className='w-full'>
      <CardHeader>
        <h2 className="font-bold">Mensagens nos últimos {days} dias</h2>
      </CardHeader>
      <div>
        <LineChartMessages data={chartData}/>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { useCampaignMetrics } from '@/features/campanhas/context/campaignMetricsContext';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

export const MessageActivityChart = () => {
  const { data: analyticsData, isLoading, isError } = useCampaignMetrics().queryMetrics;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const data = [
    { name: 'Texto', value: analyticsData.sendedMessageTextCount },
    { name: 'Mídia', value: analyticsData.sendedMessageMediaCount },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade de Mensagens</CardTitle>
        <CardDescription>Distribuição por tipo</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
            >
              <Cell fill="hsl(221, 66%, 45%)" />
              <Cell fill="hsl(221, 66%, 25%)" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

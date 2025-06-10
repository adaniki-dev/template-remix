'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export function MetricCard({ title, value, icon, link, loading }: any) {
  const router = useRouter();

  function onClickCard() {
    router.push(`dashboard/${link}`);
  }

  if (loading)
    return (
      <Card className="cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" /> {/* Para o título */}
            <Skeleton className="h-8 w-16" /> {/* Para o valor */}
          </div>
          <div className="mt-4 flex items-center gap-1">
            <Skeleton className="h-7 w-7" /> {/* Para o ícone */}
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="cursor-pointer" onClick={onClickCard}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <div className="mt-4 flex items-center gap-1">{icon}</div>
      </CardContent>
    </Card>
  );
}

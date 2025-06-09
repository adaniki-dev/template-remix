import { useProfileStore } from '@/core/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeaderDashboard() {
  const { user } = useProfileStore();

  if (!user?.name) {
    return (
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-semibold">Bem-vindo, {user?.name}</h1>
        <p className="text-muted-foreground">Monitore seu ecossistema no Autonotify!</p>
      </div>
    </div>
  );
}

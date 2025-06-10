'use client';
import TableInstance from '../components/instanceTable';
import { Button } from '@/components/ui/button';
import { useInstanceContext } from '../context/instanceContext';
import Link from 'next/link';
import { LuRefreshCcw } from 'react-icons/lu';
import { useInstancesActions } from '@/features/instancia/hooks/useInstancesActions';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';

export default function InstancePage() {
  const { refreshInstances } = useInstancesActions();
  const { queriesOptions } = useInstanceContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data, isLoading } = queriesOptions;

  const handleRefresh = async (ids: string[]) => {
    setIsSubmitting(true);
    await refreshInstances(
      { ids },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <div className="grid w-full overflow-hidden px-4">
      <div className="flex flex-col mb-4">
        <header className="flex flex-col sm:flex-row h-auto items-start sm:items-center gap-2 sm:gap-2 w-full">
          <div className="flex-1 flex justify-between items-center">
            <h1 className="font-medium text-sm sm:text-base">Listas de instâncias</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            {data && data?.length > 0 && (
              <Button
                disabled={isSubmitting}
                onClick={() => {
                  const ids = data?.map((item: any) => item.id);
                  handleRefresh(ids);
                }}
                variant="outline"
              >
                <LuRefreshCcw className={`w-5 h-5 mr-2 ${isSubmitting && 'animate-spin'}`} />
                {isSubmitting ? 'Atualizando...' : 'Atualizar Instâncias'}
              </Button>
            )}
            {isLoading && <Skeleton className="h-9 w-40 rounded-md" />}
          </div>
        </header>
      </div>
      {isLoading && <TableSkeleton colunsLength={5} />}
      {!isLoading && <TableInstance />}
      <Link className="text-sm text-blue-500" href="/dashboard/profile/">
        Configurar telefone administrativo para receber alertas
      </Link>
    </div>
  );
}

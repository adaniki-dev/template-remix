'use client';
import CardMetricSkeleton from '@/components/ui-modified/loading/cardMetricSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import EnabledIntegrations from '@/features/integrations/components/myIntegrations/enableIntegrations';
import { useEffect, useState } from 'react';
import { IoInformation } from 'react-icons/io5';

export default function MyIntegrationsList({ data, refetch }: any) {
  const sortedIntegrations = data?.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name) || [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6 overflow-y-auto p-5">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-full h-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton className="w-full h-32 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {!isLoading && isError && (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">Desculpe! Ocorreu um erro ao carregar os dados</p>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              <h1 className="font-medium">Minhas Integrações</h1>
              <p className="text-left text-muted-foreground">Gerencie suas integrações</p>

              <div className="space-y-14">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {sortedIntegrations?.length > 0 ? (
                    sortedIntegrations.map((integration: any) => (
                      <EnabledIntegrations
                        key={integration?.clientIntegrationId || integration?.id}
                        name={integration?.name}
                        src={integration?.imageUrl}
                        id={integration?.id}
                        clientIntegrationId={integration?.clientIntegrationId}
                        isEnabled={integration?.isEnabled}
                      />
                    ))
                  ) : (
                    <div className="col-start-3">
                      <div className="flex mt-4 flex-col justify-center items-center gap-3">
                        <div className="rounded-full bg-blue-300 w-12 items-center justify-center flex h-12">
                          <IoInformation className="w-7 h-7 text-blue-200" />
                        </div>
                        <div className="flex flex-col w-52 gap-3 items-center justify-center">
                          <p>Nenhuma integração ativa</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

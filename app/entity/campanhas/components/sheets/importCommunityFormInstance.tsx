'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/core/useAPI';
import ImportCommunityContainer from './components/importCommunityContainer';

export default function ImportCommunitySheet() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const { campaignsId } = useParams<{ campaignsId: string }>();
  const importGroups = searchParams.get('ImportCommunity') as string;

  useEffect(() => {
    if (importGroups) {
      setOpenModal(true);
    }
  }, [importGroups, setOpenModal]);

  const { data, isLoading, isError, refetch } = useApiQuery<any>(
    ['importedCommunity', campaignsId, importGroups],
    `community/instances?campaignsId=${campaignsId}&instanceId=${importGroups}`,
    {
      enabled: !!importGroups,
    },
  );

  function handleCloseModal() {
    removeSearchParamsInURL('ImportCommunity');
    setOpenModal(!openModal);
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[60vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Importar comunidades</SheetTitle>
          <SheetDescription>Importe comunidades para adicionar ao Autonotify</SheetDescription>
        </SheetHeader>
        {isLoading && <Skeleton className="h-28 w-full" />}
        {isError && (
          <div className="border rounded-lg border-red-500 w-full grid items-center justify-center py-6 gap-4 ">
            <p className="text-lg text-center">
              Desculpe, não conseguimos carregar suas comunidades.
              <br /> Por favor, tente novamente mais tarde.
            </p>
            <Button className="bg-red-500" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          </div>
        )}
        <div className="h-[70vh] gap-4 flex flex-col overflow-auto">
          {data &&
            data?.length > 0 &&
            data.map((instance: any) => {
              if (!instance.phone) return null;
              return (
                <ImportCommunityContainer
                  key={instance.key}
                  data={instance}
                  instanceId={importGroups}
                />
              );
            })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

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
import ImportGroupsContainer from '@/features/campanhas/components/sheets/components/importGroupsContainer';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useApiQuery } from '@/core/useAPI';

export default function ImportGroupsSheet() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const { campaignsId } = useParams<{ campaignsId: string }>();
  const ImportGroups = searchParams.get('ImportGroups') as string;

  useEffect(() => {
    if (ImportGroups) {
      setOpenModal(true);
    }
  }, [ImportGroups, setOpenModal]);

  const { data, isLoading, isError, refetch } = useApiQuery<any>(
    ['importedGroups', campaignsId, ImportGroups],
    `groups/instances?campaignsId=${campaignsId}&instanceId=${ImportGroups}`,
    {
      enabled: !!ImportGroups,
    },
  );

  function handleCloseModal() {
    removeSearchParamsInURL('ImportGroups');
    setOpenModal(!openModal);
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[60vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Importar grupos</SheetTitle>
          <SheetDescription>Importe grupos para adicionar ao Autonotify</SheetDescription>
        </SheetHeader>
        {isLoading && <Skeleton className="h-28 w-full" />}
        {isError && (
          <div className="border rounded-lg border-red-500 w-full grid items-center justify-center py-6 gap-4 ">
            <p className="text-lg text-center">
              Desculpe, não conseguimos carregar seus grupos.
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
              return <ImportGroupsContainer key={instance.key} data={instance} />;
            })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

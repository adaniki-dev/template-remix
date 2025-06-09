'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useEffect, useState } from 'react';
import { useInstancesCampaignsStore } from '@/features/campanhas/hooks/useStoreInstanceCampaigns';
import { GoAlertFill } from 'react-icons/go';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInstancesCampaignsActions } from '@/features/campanhas/hooks/useInstancesCampaignsActions';
import { useParams } from 'next/navigation';

export default function SendBackupInstanceSheet() {
  const { instances, clearInstances } = useInstancesCampaignsStore();
  const { addBackupInstanceOnCampaign } = useInstancesCampaignsActions();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (instances.length > 0) {
      setOpenModal(true);
    }
  }, [instances, setOpenModal]);

  async function handleAddBackupInstance() {
    await addBackupInstanceOnCampaign.mutateAsync(
      {
        ids: instances,
        active: true,
        campaignsId: params.campaignsId as string,
      },
      {
        onSuccess: async () => {
          clearInstances();
          setOpenModal(false);
        },
      },
    );
  }

  function handleCloseModal() {
    clearInstances();
    setOpenModal(!openModal);
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Envie seu número para ser backup</SheetTitle>
          <SheetDescription>
            Envie seu número para ser backup, caso você perca o acesso ao seu número.
          </SheetDescription>
        </SheetHeader>
        {/* <div className="flex gap-4 border rounded-md px-5 py-3 bg-yellow-400/40">
          <GoAlertFill className="text-5xl text-yellow-500" />
          <div className="grid gap-4">
            <p>
              Você está prestes a enviar seu número para ser backup,{' '}
              <strong>você não poderá mais adicionar ele em novos grupos.</strong>
            </p>
            <p>
              Caso você perca o acesso ao de um grupo, vamos redirecionar o acesso para esse número.
            </p>
          </div>
        </div> */}
        <div className="bg-blue-400/20 border rounded-md px-5 py-3 gap-4 flex items-center">
          <Info size={48} className="text-blue-500" />
          <div>
            <p>
              Para seu número de backup funcione de forma efetiva tenha ele adicionado aos contatos
              de outras Instâncias. Em qual quer dúvida entre em contato com o suporte.
            </p>
          </div>
        </div>
        <Button size="lg" onClick={handleAddBackupInstance}>
          Adicionar {instances?.length || ''} número de backups
        </Button>
      </SheetContent>
    </Sheet>
  );
}

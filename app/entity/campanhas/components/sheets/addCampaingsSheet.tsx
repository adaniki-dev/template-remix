'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import FormCreateCampaigns from '@/features/campanhas/components/form/formCreateCampaigns';

export default function AddCampaignsSheet() {
  const searchParams = useSearchParams();
  const CreateCampaigns = searchParams.get('CreateCampaigns');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (CreateCampaigns === 'y') {
      setOpenModal(true);
    }
  }, [CreateCampaigns, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('CreateCampaigns');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Crie uma campanha</SheetTitle>
          <SheetDescription>
            Crie campanhas, a quantidade maxima de grupos serão baseado quantidades de instâncias
            atreladas.
          </SheetDescription>
        </SheetHeader>
        <FormCreateCampaigns handleCloseModal={handleCloseModal} />
      </SheetContent>
    </Sheet>
  );
}

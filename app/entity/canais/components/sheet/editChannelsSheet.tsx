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
import FormEditChannels from '@/features/canais/components/forms/formEditChannels';

export default function EditChannelSheet() {
  const searchParams = useSearchParams();
  const EditChannels = searchParams.get('EditChannels');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (EditChannels) {
      setOpenModal(true);
    }
  }, [EditChannels, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('EditChannels');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Crie seu canal</SheetTitle>
          <SheetDescription>Crie canais, para comunicar com todo o seu publico.</SheetDescription>
        </SheetHeader>
        <FormEditChannels handleCloseModal={handleCloseModal} channelId={EditChannels} />
      </SheetContent>
    </Sheet>
  );
}

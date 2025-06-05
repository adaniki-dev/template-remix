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
import FormCreateChannels from '@/features/canais/components/forms/formCreateChannels';

export default function AddChannelSheet() {
  const searchParams = useSearchParams();
  const CreateChannels = searchParams.get('CreateChannels');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (CreateChannels === 'y') {
      setOpenModal(true);
    }
  }, [CreateChannels, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('CreateChannels');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Crie seu canal</SheetTitle>
          <SheetDescription>Crie canais, para comunicar com todo o seu publico.</SheetDescription>
        </SheetHeader>
        <FormCreateChannels handleCloseModal={handleCloseModal} />
      </SheetContent>
    </Sheet>
  );
}

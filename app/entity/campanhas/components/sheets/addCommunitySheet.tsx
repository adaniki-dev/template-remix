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
import FormCreateCommunity from '@/features/campanhas/components/form/formCreateComunity';

export default function AddCommunitySheet() {
  const searchParams = useSearchParams();
  const CreateGroup = searchParams.get('CreateComunity');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (CreateGroup === 'y') {
      setOpenModal(true);
    }
  }, [CreateGroup, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('CreateComunity');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Criação de comunidade</SheetTitle>
          <SheetDescription>
            Recomendamos criar comunidade com 600 membros no máximo
          </SheetDescription>
        </SheetHeader>
        <FormCreateCommunity handleCloseModal={handleCloseModal} />
      </SheetContent>
    </Sheet>
  );
}

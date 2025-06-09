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
import FormCreateGroup from '@/features/campanhas/components/form/formCreateGroup';

export default function AddGroupsSheet() {
  const searchParams = useSearchParams();
  const CreateGroup = searchParams.get('CreateGroup');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (CreateGroup === 'y') {
      setOpenModal(true);
    }
  }, [CreateGroup, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('CreateGroup');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Criação de grupos</SheetTitle>
          <SheetDescription>Recomendamos criar grupos com 600 membros no máximo</SheetDescription>
        </SheetHeader>
        <FormCreateGroup handleCloseModal={handleCloseModal} />
      </SheetContent>
    </Sheet>
  );
}

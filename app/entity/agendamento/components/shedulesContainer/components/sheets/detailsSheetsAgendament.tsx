'use client';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useParams, useSearchParams } from 'next/navigation';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import DetailsAgendament from './detailsAgendament';

export default function DetailsSheetsAgendament() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const details = searchParams.get('shceduleId');

  useEffect(() => {
    if (details) {
      setOpenModal(true);
    }
  }, [details, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('shceduleId');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Detalhes de envio</SheetTitle>
          <SheetDescription>Detalhes do envio do seu agendamento</SheetDescription>
        </SheetHeader>
        <DetailsAgendament />
      </SheetContent>
    </Sheet>
  );
}

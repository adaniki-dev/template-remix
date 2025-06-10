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
import TicketForm from '@/features/authSupport/components/ticketForm/ticketForm';

export default function AddTicketSheet() {
  const searchParams = useSearchParams();
  const createTicket = searchParams.get('CreateTicket');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (createTicket === 'y') {
      setOpenModal(true);
    }
  }, [createTicket, setOpenModal]);

  function handleCloseModal() {
    setOpenModal(!openModal);
    removeSearchParamsInURL('CreateTicket');
  }

  return (
    <Sheet open={openModal} onOpenChange={handleCloseModal}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Gere um ticket</SheetTitle>
          <SheetDescription>Gere um ticket para o suporte</SheetDescription>
        </SheetHeader>
        <TicketForm handleCloseModal={handleCloseModal} />
      </SheetContent>
    </Sheet>
  );
}

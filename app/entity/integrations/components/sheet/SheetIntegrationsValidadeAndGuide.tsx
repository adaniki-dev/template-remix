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
import { useIntegrationsContext } from '../../context/integrationContext';

export default function SheetIntegrationsValideAndGuide() {
  const { findIntegrationById } = useIntegrationsContext();
  const searchParams = useSearchParams();
  const validate = searchParams.get('onGuide');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (validate) {
      setOpenModal(true);
    }
  }, [validate]);

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('onGuide');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }

  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    handleRemoveSearchParamsVariant();
  }
  return (
    <Sheet open={openModal} onOpenChange={handleOpenOrCloseSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Guia para Integração</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div>
          <p>Desculpe! Estamos monstando o guia mais rapido possivel</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

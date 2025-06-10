'use client';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useDashboardContext } from '@/features/relatory/context/dashboardContext';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MessageModal() {
  const [openModal, setOpenModal] = useState(false);
  const { handlefindMessageById } = useDashboardContext();
  const searchParams = useSearchParams();
  const messageId = searchParams.get('messageId');
  const message = handlefindMessageById(messageId);
  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('messageId');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }

  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    handleRemoveSearchParamsVariant();
  }
  useEffect(() => {
    if (messageId && message) {
      setOpenModal(true);
    }
  }, [messageId, message]);

  if (!message) {
    return null;
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenOrCloseSheet}>
      <DialogContent>
        <DialogTitle>Menssagem</DialogTitle>
        <DialogDescription>{message?.message}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

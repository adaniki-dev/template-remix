'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useApiQuery } from '@/core/useAPI';
import useStorage from '@/hooks/useStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AlertAdministrativeModal() {
  const [openModal, setOpenModal] = useState(false);
  const [cachedData, setCachedData] = useStorage<any>('alertAdministrative', false, 'local');
  const router = useRouter();
  const { data, isLoading } = useApiQuery<any>(['/users'], '/users');

  const isArrayType = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return [];
  };

  useEffect(() => {
    if (data && !isLoading) {
      let defaultValues = {
        phones: [...isArrayType(data?.data?.phones)],
        emails: [...isArrayType(data?.data?.emails)],
      };
      if (defaultValues.emails.length <= 0 && defaultValues.phones.length <= 0 && !cachedData) {
        setOpenModal(true);
      }
    }
  }, [cachedData, data, isLoading]);

  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    setCachedData(true);
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenOrCloseSheet}>
      <DialogContent>
        <DialogTitle>Opa! Você não tem um contato administrativo configurado</DialogTitle>
        <DialogDescription>
          Configure contatos administrativos para receber notificações importantes sobre o status
          dos serviços.
        </DialogDescription>
        <div className="flex gap-8 justify-end items-end w-full mt-4">
          <Button variant="destructive" onClick={() => handleOpenOrCloseSheet()}>
            Não quero configurar
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push('/dashboard/profile');
              handleOpenOrCloseSheet();
            }}
          >
            Quero Configurar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

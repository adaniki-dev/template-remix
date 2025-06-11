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
import TabaHooksDetails from './components/tabsHooks';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { useConfigHookContext } from '@/features/integrations/context/configHooksContext';
import { toast } from 'sonner';

export default function SheetEditMessageHook() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const validate = searchParams.get('editMessage');
  const type = searchParams.get('type');
  const { changeMessageHook } = useHooksActions();
  const { findHookClientById } = useConfigHookContext();
  const hook = findHookClientById(validate as string, type as string);
  useEffect(() => {
    if (validate && type) {
      setOpenModal(true);
    }
  }, [validate, type]);

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('editMessage');
    searchParams.delete('type');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }

  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    handleRemoveSearchParamsVariant();
  }
  if (!hook) return null;

  function handleSubmit(values: any, { setSubmitting }: any) {
    const id = hook?.id as string;
    setSubmitting(true);
    changeMessageHook(
      { hookId: id, message: values.message },
      {
        onSuccess: () => {
          toast.success('Mensagem alterada com sucesso');
          handleOpenOrCloseSheet();
        },
        onError: () => {
          toast.error('Erro ao alterar mensagem');
        },
        onSettled() {
          setSubmitting(false);
        },
      },
    );
  }

  return (
    <Sheet open={openModal} onOpenChange={handleOpenOrCloseSheet}>
      <SheetContent className="min-w-[100vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>{hook.name}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <TabaHooksDetails handleSubmit={handleSubmit} hook={hook} type={type} />
      </SheetContent>
    </Sheet>
  );
}

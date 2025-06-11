'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import HighlightVariables from '../util/hightlightVariables';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { useConfigHookContext } from '@/features/integrations/context/configHooksContext';
import { toast } from 'sonner';

export default function SheetShowHookDetails({
  clientIntegrationId,
}: {
  clientIntegrationId: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const validate = searchParams.get('showTemplate');
  const type = searchParams.get('type');
  const { addTemplateToHook } = useHooksActions();
  const { findHookById } = useConfigHookContext();
  const hook = findHookById(validate as string, type as string);
  useEffect(() => {
    if (validate && type && hook) {
      setOpenModal(true);
    }
  }, [validate, type, hook]);

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('showTemplate');
    searchParams.delete('type');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }

  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    handleRemoveSearchParamsVariant();
  }
  if (!hook) return null;

  function handleSendHook() {
    const id = hook?.id as string;
    addTemplateToHook(
      {
        clientIntegrationId: clientIntegrationId,
        hookId: id,
      },
      {
        onSuccess: () => {
          toast.success('Template criado com sucesso');
          handleOpenOrCloseSheet();
        },
        onError: () => {
          toast.error('Erro ao criar template');
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
        <div className="border border-primary p-6 rounded-lg">
          <HighlightVariables message={hook.message} />
        </div>
        <SheetFooter>
          <Button onClick={() => handleSendHook}>Implementar Hook</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

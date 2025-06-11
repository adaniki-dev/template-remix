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
import IntegrationsFormContainer from '../integrationsFormContainer';
import { useIntegrationsContext } from '../../context/integrationContext';
import { useApiQuery } from '@/core/useAPI';

export default function SheetIntegrateIntegration() {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();
  const integrationOpen = searchParams.get('integrationOpen') || (null as string | null);
  const token = searchParams.get('integrationToken') || null;
  const { query } = useIntegrationsContext();

  useEffect(() => {
    if (integrationOpen) {
      setOpenModal(true);
      query.refetch();
    }
  }, [integrationOpen]);

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('integrationOpen');
    searchParams.delete('integrationToken');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  }
  function handleOpenOrCloseSheet() {
    setOpenModal(!openModal);
    handleRemoveSearchParamsVariant();
  }

  const { data, isLoading, isError } = useApiQuery<any>(
    ['integrationToken', `${integrationOpen ? integrationOpen : ''}`],
    `integrations/client/${integrationOpen}`,
    {
      enabled: !!integrationOpen && !token,
    },
  );

  return (
    <Sheet open={openModal} onOpenChange={handleOpenOrCloseSheet}>
      <SheetContent className="min-w-[90vw] xl:min-w-[40vw] gap-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Utilize o token para conectar a sua integração</SheetTitle>
          <SheetDescription>
            O token é uma chave de acesso que permite a integração entre a plataforma e a sua
            integração
          </SheetDescription>
        </SheetHeader>
        {isLoading && <p>Carregando...</p>}
        {isError && <p>Ocorreu um erro ao carregar o token</p>}
        {!isLoading && data && (
          <IntegrationsFormContainer
            integrationsId={integrationOpen}
            token={data.token}
            closeModal={handleOpenOrCloseSheet}
          />
        )}
        {token && (
          <IntegrationsFormContainer
            integrationsId={integrationOpen}
            token={token}
            closeModal={handleOpenOrCloseSheet}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

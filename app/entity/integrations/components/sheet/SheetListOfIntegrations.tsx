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
import { IntegrationsInitialProps } from '../../types/integrations';
import IntegrationMiniForm from './components/integrationMiniForm';

export default function SheetListOfIntegrations() {
  const { query } = useIntegrationsContext();
  const searchParams = useSearchParams();
  const validate = searchParams.get('listIntegrations');
  const [openModal, setOpenModal] = useState(false);
  const { data = null } = query;
  useEffect(() => {
    if (validate) {
      setOpenModal(true);
    }
  }, [validate]);

  function handleRemoveSearchParamsVariant() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('listIntegrations');
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
          <SheetTitle>Lista de Integrações disponíveis</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        {data && (
          <div className="grid gap-3">
            {data.integrations.map((integration: IntegrationsInitialProps) => (
              <IntegrationMiniForm
                key={integration.id}
                name={integration.name}
                src={integration.imageUrl}
                id={integration.id}
                isEnabled={integration.isEnabled}
                description={integration.description}
              />
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

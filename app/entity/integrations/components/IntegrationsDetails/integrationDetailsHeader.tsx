'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { useIntegrationsContext } from '../../context/integrationContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import IntegrationHeader from '@/features/integrations/components/IntegrationsDetails/integrationHeader';
import { Skeleton } from '@/components/ui/skeleton';

export function IntegrationsDetailsHeader({ integrationsId }: { integrationsId: string }) {
  const { findIntegrationById } = useIntegrationsContext();
  const integration = findIntegrationById(integrationsId);
  const integrationName = integration?.integrationName?.toLowerCase() || '';
  const isAdm = ['whmcs', 'woocommerce'].includes(integrationName);

  if (!integration) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src={integration.imageUrl}
                alt="Imagem painel"
                width={42}
                height={42}
                className="aspect-square"
              />
              <div className="ml-2">
                <p className="text-lg capitalize font-semibold">{integration.name}</p>
                <p className="text-xs ">Painéis de Hooks</p>
              </div>
            </div>
            <IntegrationHeader isAdm={isAdm} />
          </div>
          <Button
            onClick={() => handleAddSearchParamsToUrl('integrationOpen', integrationsId)}
            variant="outline"
          >
            Alterar Credenciais
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

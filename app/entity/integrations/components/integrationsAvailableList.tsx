'use client';

import IntegrationMiniForm from '@/features/integrations/components/sheet/components/integrationMiniForm';
import { IntegrationsInitialProps } from '@/features/integrations/types/integrations';
import { IoInformation } from 'react-icons/io5';

export default function IntegrationsAvailableList({ data, refetch }: any) {
  return (
    <div className="space-y-6 overflow-y-auto p-5">
      <h1 className="font-medium">Integrações Disponiveis</h1>
      <p className="text-left text-muted-foreground">
        Conecte-se com as principais plataformas do mercado
      </p>
      <div className="space-y-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.length > 0 ? (
            data?.map((integration: IntegrationsInitialProps) => (
              <IntegrationMiniForm
                key={integration?.id}
                name={integration?.name}
                src={integration?.imageUrl}
                id={integration?.id}
                isEnabled={integration?.isEnabled}
                description={integration?.description}
                refetch={refetch}
              />
            ))
          ) : (
            <div className="col-start-3">
              <div className="flex mt-4 flex-col justify-center items-center gap-3">
                <div className="rounded-full bg-blue-300 w-12 items-center justify-center flex h-12">
                  <IoInformation className="w-7 h-7 text-blue-200" />
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <p>Integrações não encontradas</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

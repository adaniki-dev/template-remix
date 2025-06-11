'use client';
import DataTableIntegrationsInstance from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance/datatable/datatable';
import { Fragment } from 'react';
import { ColumnsIntegrationInstance } from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance/datatable/columns';
import PaginationIntegrationInstance from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance/datatable/pagination';
import { useIntegrationInstanceByIdContext } from '@/features/integrations/components/IntegrationsDetails/integrationInstance/context';

export default function IntegrationInstanceTabs() {
  const { queryIntegrationInstances } = useIntegrationInstanceByIdContext();
  const { data, isLoading, isError } = queryIntegrationInstances;
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (isError && !data?.items) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Desculpe! Ocorreu um erro na procura de suas instâncias</p>
      </div>
    );
  }

  if (data && data?.items && data?.items.length <= 0) {
    return (
      <div className="flex justify-center items-center h-96 text-center">
        <p className="text-gray-500">
          Não tem nenhuma instância nessa integração! <br /> Por favor adicione instâncias a
          integração.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-7xl mb-10">
      <Fragment>
        <DataTableIntegrationsInstance data={data?.items} columns={ColumnsIntegrationInstance} />
        <div className="flex w-full justify-center items-center mt-4">
          <PaginationIntegrationInstance />
        </div>
      </Fragment>
    </div>
  );
}

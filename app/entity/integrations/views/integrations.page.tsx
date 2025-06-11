'use client';

import MyIntegrationsList from '../components/myIntegrations/myIntegrationsList';
import IntegrationsAvailableList from '@/features/integrations/components/integrationsAvailableList';
import renderContent from '@/components/ui-modified/renderContent';
import { useApiQuery } from '@/core/useAPI';

export default function IntegrationsPage() {
  const { data, isLoading, refetch } = useApiQuery<any>(['integrations'], '/integrations');

  return (
    <div className="space-y">
      <div className="p-4">
        {renderContent(isLoading, data?.clientIntegrations, MyIntegrationsList)}
      </div>
      <div className="p-4">
        {renderContent(isLoading, data?.integrations, IntegrationsAvailableList, refetch)}
      </div>
    </div>
  );
}

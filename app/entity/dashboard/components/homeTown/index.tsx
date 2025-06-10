'use client';
import HeaderDashboard from '@/features/dashboard/components/bento/components/headerDashboard';
import IntegrationCard from '../bento/components/integrationCard';
import MensageCard from '../bento/components/graphicMessage/mensagesCard';
import { useInstanceData } from '@/features/dashboard/hooks/useInstanceData';
import { useContactData } from '@/features/dashboard/hooks/useContactData';
import { useInstanceMetrics } from '@/features/dashboard/hooks/useInstanceMetrics';
import { MetricsGrid } from '@/features/dashboard/components/metricsGrid';

export function HomeTown() {
  const { queryIntegration, queryContact, queryMessage, queryInstance } = useInstanceData();
  const { contactLength } = useContactData(queryContact);
  const { quantityActiveInstance, quantityInactiveInstance } = useInstanceMetrics(queryInstance);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        <HeaderDashboard />
        <MetricsGrid
          activeInstances={quantityActiveInstance}
          inactiveInstances={quantityInactiveInstance}
          contactLength={contactLength}
          isLoadingInstance={queryInstance.isLoading}
          isLoadingContact={queryContact.isLoading}
        />
        <IntegrationCard
          data={queryIntegration.data?.clientIntegrations}
          isLoading={queryIntegration?.isLoading}
        />
        <MensageCard data={queryMessage.data} isLoading={queryMessage.isLoading} />
      </div>
    </div>
  );
}

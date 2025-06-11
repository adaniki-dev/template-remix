'use client';

import IntegrationInstanceTabs from '@/features/integrations/components/IntegrationsDetails/dataTableIntegrationsInstance';
import InstanceHeader from '../components/IntegrationsDetails/integrationInstance/components/instanceHeader';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import AddInstanceIntegration from '../components/IntegrationsDetails/integrationInstance/components/addInstanceIntegration';
import { IntegrationInstanceByIdProviders } from '@/features/integrations/components/IntegrationsDetails/integrationInstance/context/provider';

export default function InstanceIntegrationPage() {
  return (
    <div className="grid w-full overflow-hidden lg:grid-rows-[56px_1fr] p-4 gap-4">
      <IntegrationInstanceByIdProviders>
        <SuspenseWrapper modal={AddInstanceIntegration} />
        <InstanceHeader />
        <IntegrationInstanceTabs />
      </IntegrationInstanceByIdProviders>
    </div>
  );
}

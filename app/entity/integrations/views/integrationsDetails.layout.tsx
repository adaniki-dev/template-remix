import SheetShowHookDetails from '../components/sheet/SheetShowHookDetails';
import { IntegrationsDetailsHeader } from '@/features/integrations/components/IntegrationsDetails/integrationDetailsHeader';
import ConfigHooksProviders from '@/features/integrations/context/configHooksContext/provider';
import InterfaceGroupsProviders from '@/features/integrations/context/interfaceGroupsContext/provider';
import SheetEditMessageHook from '@/features/integrations/components/sheet/SheetEditMessageHook';

export default async function IntegrationHooksLayout(props: any) {
  const params = await props.params;
  return (
    <ConfigHooksProviders params={params}>
      <InterfaceGroupsProviders>
          <SheetEditMessageHook />
          <SheetShowHookDetails clientIntegrationId={params.clientIntegrationId} />
          <div className="p-6">
            <IntegrationsDetailsHeader integrationsId={params.clientIntegrationId} />
          </div>
          <div className="p-6">{props.children}</div>
      </InterfaceGroupsProviders>
    </ConfigHooksProviders>
  );
}

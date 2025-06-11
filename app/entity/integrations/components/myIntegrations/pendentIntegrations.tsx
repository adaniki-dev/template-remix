import { Link } from '@/components/ui/Link';
import IntegrationsCardList from '@/features/integrations/components/integrationsCardList';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

type IntegrationsLinkProps = {
  name: string;
  src: string;
  id: string;
  isEnabled: boolean;
  toEdit?: boolean;
  clientIntegrationId?: string;
};

export default function PendentIntegrations({
  id,
  clientIntegrationId,
  name,
  src,
  isEnabled,
}: IntegrationsLinkProps) {
  return (
    <button
      className="cursor-pointer"
      onClick={() => handleAddSearchParamsToUrl('integrationOpen', clientIntegrationId)}
    >
      <IntegrationsCardList name={name} src={src} isEnabled={isEnabled} />
    </button>
  );
}

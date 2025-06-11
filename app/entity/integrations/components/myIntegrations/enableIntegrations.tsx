import { Link } from '@/components/ui/Link';
import IntegrationsCardList from '@/features/integrations/components/integrationsCardList';

type IntegrationsLinkProps = {
  name: string;
  src: string;
  id: string;
  isEnabled: boolean;
  toEdit?: boolean;
  clientIntegrationId?: string;
};

export default function EnabledIntegrations({
  id,
  name,
  src,
  isEnabled,
  clientIntegrationId,
}: IntegrationsLinkProps) {
  return (
    <Link href={`/dashboard/integracoes/${id}/${clientIntegrationId}/detalhes/instancias`}>
      <IntegrationsCardList name={name} src={src} isEnabled={isEnabled} />
    </Link>
  );
}

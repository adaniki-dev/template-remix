import { MetricCard } from '@/features/dashboard/components/homeTown/components/metricCard';
import { RiContactsBook3Line, RiInstanceLine } from 'react-icons/ri';

export function MetricsGrid({
  activeInstances,
  inactiveInstances,
  contactLength,
  isLoadingInstance,
  isLoadingContact,
}: {
  activeInstances: number;
  inactiveInstances: number;
  contactLength: number;
  isLoadingInstance: boolean;
  isLoadingContact: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Instâncias Ativas"
        value={activeInstances === 0 ? 0 : activeInstances}
        icon={<RiInstanceLine className="w-7 h-7" />}
        link="instancia"
        loading={isLoadingInstance}
      />
      <MetricCard
        title="Instâncias Inativas"
        value={inactiveInstances === 0 ? 0 : inactiveInstances}
        icon={<RiInstanceLine className="w-7 h-7" />}
        link="instancia"
        loading={isLoadingInstance}
      />
      <MetricCard
        title="Contatos administrativos"
        value={contactLength === 0 ? 0 : contactLength}
        icon={<RiContactsBook3Line className="w-7 h-7" />}
        link="profile"
        loading={isLoadingContact}
      />
    </div>
  );
}

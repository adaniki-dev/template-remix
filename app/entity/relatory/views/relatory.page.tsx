import { SuspenseWrapper } from '@/components/SuspenseWrapper';
import FilterMessage from '@/features/relatory/components/filtersSheet/filterMessage';
import RelatoryTabs from '@/features/relatory/components/relatoryTabs';
import { DashboardProviders } from '@/features/relatory/context/dashboardContext/provider';

export default async function RelatoryPage(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <DashboardProviders>
      <SuspenseWrapper modal={FilterMessage} />
      <RelatoryTabs />
    </DashboardProviders>
  );
}

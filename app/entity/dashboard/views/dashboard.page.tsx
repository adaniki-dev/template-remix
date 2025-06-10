import SummaryProviders from '../components/bento/context/provider';
import { HomeTown } from '../components/homeTown';

export default function DashboardPage() {
  return (
    <SummaryProviders>
      <HomeTown />
    </SummaryProviders>
  );
}

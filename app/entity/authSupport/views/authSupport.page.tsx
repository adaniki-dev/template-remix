import TicketTabs from '../components/supportTabs';
import TicketProviders from '@/features/authSupport/context/ticketsContext/provider';

export default function AuthSupportPage() {
  return (
    <TicketProviders>
      <div className="w-full flex justify-center">
        <TicketTabs />
      </div>
    </TicketProviders>
  );
}

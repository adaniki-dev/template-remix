import TicketProviders from '@/features/authSupport/context/ticketsContext/provider';

export default async function SupportLayout(props: any) {
  return <TicketProviders>{props.children}</TicketProviders>;
}

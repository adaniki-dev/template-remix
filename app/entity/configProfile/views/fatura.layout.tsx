import { OrdersProviders } from '@/features/configProfile/context/faturaContext/provider';

export default async function FaturaLayout(props: any) {
  return <OrdersProviders>{props.children}</OrdersProviders>;
}

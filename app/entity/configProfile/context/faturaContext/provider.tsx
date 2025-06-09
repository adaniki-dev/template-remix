'use client';
import { OrderProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

interface OrdersProvidersProps {
  children: React.ReactNode;
  // params: any;
  // searchParams: any;
}

export function OrdersProviders({ children }: OrdersProvidersProps) {
  const queryResult = useApiQuery(['orders'],'orders')

  return <OrderProvider queriesOptions={queryResult}>{children}</OrderProvider>;
}

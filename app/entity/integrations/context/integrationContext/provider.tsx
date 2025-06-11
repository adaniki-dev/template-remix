'use client';
import { IntegrationsProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

export default function IntegrationsProviders({ children }: { children: React.ReactNode }) {
  const queryResult = useApiQuery(['integrations'], 'integrations')
  return <IntegrationsProvider queriesOptions={queryResult}>{children}</IntegrationsProvider>;
}

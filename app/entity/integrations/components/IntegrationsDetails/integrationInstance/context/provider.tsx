'use client';
import { useParams } from 'next/navigation';
import { IntegrationInstanceByIdProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

interface IntegrationProvidersProps {
  children: React.ReactNode;
}

export function IntegrationInstanceByIdProviders({ children }: IntegrationProvidersProps) {
  return <IntegrationInstanceByIdProvider>{children}</IntegrationInstanceByIdProvider>;
}

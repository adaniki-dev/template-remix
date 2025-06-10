'use client';
import { InstanceProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

export default function InstanceProviders({ children }: { children: React.ReactNode }) {
  const queriesOptions = useApiQuery(['instances'], 'instance/all');

  return <InstanceProvider queriesOptions={queriesOptions}>{children}</InstanceProvider>;
}

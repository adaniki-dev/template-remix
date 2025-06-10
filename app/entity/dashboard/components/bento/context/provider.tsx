'use client';
import { SummaryProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

export default function SummaryProviders({ children, params, searchParams }: any) {
  const queryInstance = useApiQuery<any>(['/instances'], '/instance/all');
  const queryMessage = useApiQuery<any>(['/messages'], `/messages?type=7`);
  const queryIntegration = useApiQuery<any>(['/integrations'], '/integrations');
  const queryContact = useApiQuery<any>(['/users'], '/users');

  return (
    <SummaryProvider
      queryInstance={queryInstance}
      queryIntegration={queryIntegration}
      queryMessage={queryMessage}
      queryContact={queryContact}
    >
      {children}
    </SummaryProvider>
  );
}

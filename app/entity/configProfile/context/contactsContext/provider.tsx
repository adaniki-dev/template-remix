'use client';
import { ContactProvider } from './context';
import { useApiQuery } from '@/core/useAPI';

interface ContactsProvidersProps {
  children: React.ReactNode;
}

export function ContactsProviders({ children }: ContactsProvidersProps) {
  const queryContact = useApiQuery<any>(['/users'], '/users');

  return <ContactProvider queriesOptions={queryContact}>{children}</ContactProvider>;
}

'use client';
import { useContext } from 'react';
import { ContactContext } from './context';

export function useContactsContext() {
  const context = useContext(ContactContext);

  if (context === undefined) {
    throw new Error('useContactsContext must be used within a ContactsProvider');
  }
  return context;
}

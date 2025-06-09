'use client';
import { useContext } from 'react';
import { TicketContext } from './context';

export function useTicketContext() {
  const context = useContext(TicketContext);

  if (context === undefined) {
    throw new Error('useTicketContext must be used within a TicketProviders');
  }
  return context;
}

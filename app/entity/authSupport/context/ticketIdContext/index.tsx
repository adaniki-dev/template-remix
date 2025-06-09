'use client';
import { TicketByIdContext } from '@/features/authSupport/context/ticketIdContext/context';
import { useContext } from 'react';

export function useTicketByIdContext() {
  const context = useContext(TicketByIdContext);

  if (context === undefined) {
    throw new Error('useTicketByIdContext must be used within a TicketByIdProviders');
  }
  return context;
}

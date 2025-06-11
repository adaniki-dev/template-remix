'use client';
import { useContext } from 'react';
import { IntegrationsContext } from './context';

export function useIntegrationsContext() {
  const context = useContext(IntegrationsContext);

  if (context === undefined) {
    throw new Error('useIntegrationsContext must be used within a IntegrationsProvider');
  }
  return context;
}

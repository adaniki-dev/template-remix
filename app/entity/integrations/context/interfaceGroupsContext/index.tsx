'use client';
import { InterfaceGroupsContext } from '@/features/integrations/context/interfaceGroupsContext/context';
import { useContext } from 'react';

export function useInterfaceGroupsContext() {
  const context = useContext(InterfaceGroupsContext);

  if (context === undefined) {
    throw new Error('useIntegrationsContext must be used within a InterfaceGroupsProvider');
  }
  return context;
}

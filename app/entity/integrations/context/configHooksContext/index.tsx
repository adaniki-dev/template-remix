'use client';
import { ConfigHookContext } from '@/features/integrations/context/configHooksContext/context';
import { useContext } from 'react';

export function useConfigHookContext() {
  const context = useContext(ConfigHookContext);

  if (context === undefined) {
    throw new Error('useIntegrationsContext must be used within a ConfigHooksProvider');
  }
  return context;
}

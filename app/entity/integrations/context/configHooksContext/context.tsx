'use client';
import {
  UseQueryHooksClientIntegrations,
  UseQueryTemplate,
} from '@/features/integrations/hooks/useHookProviders';
import { HookProps } from '@/features/integrations/types/hooksIntegrations';
import React, { createContext } from 'react';

type ConfigHookContextType = {
  hooksQueries: any;
  hooksClientQueries: any;
  findHookById: (id: string, type: string) => HookProps | null;
  findHookClientById: (id: string, type: string) => HookProps | null;
};

export const ConfigHookContext = createContext<ConfigHookContextType>({
  hooksQueries: null,
  hooksClientQueries: null,
  findHookById: () => null,
  findHookClientById: () => null,
});

export const ConfigHookProvider = ({ children, integrationId, clientIntegrationId }: any) => {
  const hooksQueries: any = UseQueryTemplate(integrationId, clientIntegrationId);
  const hooksClientQueries: any = UseQueryHooksClientIntegrations(clientIntegrationId);

  function findHookById(id: string, type: string) {
    if (hooksQueries.data && type in hooksQueries.data) {
      const hook = hooksQueries.data[type].find((hook: HookProps) => hook.id === id);
      return hook;
    }
    if (!hooksQueries.data || !hooksQueries.data[type]) return null;
  }

  function findHookClientById(id: string, type: string) {
    if (hooksClientQueries?.data && type in hooksClientQueries.data) {
      const hook = hooksClientQueries?.data[type].find((hook: HookProps) => hook.id === id);
      return hook;
    }
    if (!hooksClientQueries?.data || !hooksClientQueries?.data[type]) return null;
  }

  const contextValue: ConfigHookContextType = {
    hooksQueries: hooksQueries,
    hooksClientQueries: hooksClientQueries,
    findHookById: findHookById,
    findHookClientById: findHookClientById,
  };

  return <ConfigHookContext.Provider value={contextValue}>{children}</ConfigHookContext.Provider>;
};

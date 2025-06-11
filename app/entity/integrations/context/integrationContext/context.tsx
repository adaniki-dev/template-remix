'use client';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import React, { createContext } from 'react';
import {
  IntegrationsProps,
  IntegrationsInitialProps,
  IntegrationsQueryProps,
} from '../../types/integrations';
import { UseQueryResult } from '@tanstack/react-query';

type IntegrationsContextType = {
  query: UseQueryResult<IntegrationsQueryProps, Error>;
  findIntegrationById: (id: string) => IntegrationsProps | null;
  handleAddSearchParamsToUrl: (key: string, value: string) => void;
};

export const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

type IntegrationsProviderProps = {
  children: React.ReactNode;
  queriesOptions: any;
};

export const IntegrationsProvider = ({ children, queriesOptions }: IntegrationsProviderProps) => {
  function findIntegrationById(id: string): IntegrationsProps | null {
    if (!queriesOptions.data) return null;
    const integration = queriesOptions.data.clientIntegrations?.find(
      (integration: IntegrationsInitialProps) => integration.clientIntegrationId === id,
    );
    return integration
      ? {
          ...integration,
          fields:
            JSON.parse(
              `[{"name": "host", "label": "Seu domínio do WHMCS", "type": "string", "required": true, "hidden": false},{"name": "apiIdentifier", "label": "API Identifier", "type": "string", "required": true, "hidden": false},{"name": "apiSecret", "label": "API Secret", "type": "string", "required": true, "hidden": false}]`,
            ) || [],
        }
      : null;
  }

  const contextValue: IntegrationsContextType = {
    query: queriesOptions,
    findIntegrationById,
    handleAddSearchParamsToUrl: (key, value) => handleAddSearchParamsToUrl(key, value),
  };

  return (
    <IntegrationsContext.Provider value={contextValue}>{children}</IntegrationsContext.Provider>
  );
};

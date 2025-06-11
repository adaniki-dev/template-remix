'use client';
import { useContext } from 'react';
import { IntegrationInstanceByIdContext } from './context';

export function useIntegrationInstanceByIdContext() {
  const context = useContext(IntegrationInstanceByIdContext);

  if (context === undefined) {
    throw new Error(
      'useIntegrationInstanceByIdContext must be used within a IntegrationInstanceByIdProviders',
    );
  }
  return context;
}

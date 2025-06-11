'use client';

import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import React, { createContext } from 'react';

export const DashboardContext = createContext<any>({
  queriesOptions: {
    data: null,
  },
  handleAddSearchParamsToUrl: handleAddSearchParamsToUrl,
});

export const DashboardProvider = ({ children, queriesOptions }: any) => {
  const { data, isLoading } = queriesOptions;
  function handlefindMessageById(id: string) {
    if (isLoading) return null;
    return data.messages.find((message: any) => message.id === id);
  }

  return (
    <DashboardContext.Provider
      value={{
        queriesOptions: queriesOptions,
        handleAddSearchParamsToUrl: handleAddSearchParamsToUrl,
        handlefindMessageById: handlefindMessageById,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

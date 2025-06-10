'use client';

import { useMutate } from '@/lib/TanStackQuery/useMutate';
import React, { createContext } from 'react';
import { deleteInstanceById } from './actions/deleteInstance';
import { postOrderInstance } from './actions/postOrderInstance';

export const InstanceContext = createContext<any>({
  queriesOptions: {
    data: [],
    isLoading: false,
  },
});

export const InstanceProvider = ({
  children,
  queriesOptions,
  querieRefecthGet,
  postIsLoading,
  getIsLoading,
  hasInstance,
}: any) => {
  const { mutate } = useMutate();

  return (
    <InstanceContext.Provider
      value={{
        queriesOptions: queriesOptions,
        querieRefecthGet,
        postIsLoading,
        getIsLoading,
        hasInstance,
        deleteInstanceById: (instanceId: string, callback: any) =>
          deleteInstanceById(instanceId, callback, mutate),
        postOrderInstance: (callback: any) => postOrderInstance(callback, mutate),
      }}
    >
      {children}
    </InstanceContext.Provider>
  );
};

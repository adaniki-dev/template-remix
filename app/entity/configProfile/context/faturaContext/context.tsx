'use client';

import { useMutate } from '@/lib/TanStackQuery/useMutate';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import React, { createContext } from 'react';
import { getOrderById } from './actions/getFaturaById';

export const OrderContext = createContext<any>({
  queriesOptions: null,
  handleAddSearchParamsToUrl: handleAddSearchParamsToUrl,
});

export const OrderProvider = ({ children, queriesOptions }: any) => {
  const { mutate } = useMutate();
  return (
    <OrderContext.Provider
      value={{
        queriesOptions: queriesOptions,
        handleAddSearchParamsToUrl: handleAddSearchParamsToUrl,
        getOrderById: (invoiceId: string, callback: any) =>
          getOrderById(invoiceId, callback, mutate),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

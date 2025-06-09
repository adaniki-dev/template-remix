'use client';

import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import React, { createContext, useState } from 'react';
import { patchAddContactClient } from '../../services/client/patchAddContact';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ContactContext = createContext<any>({
  queriesOptions: null,
  handleAddSearchParamsToUrl: handleAddSearchParamsToUrl,
});

function removeInfo(array: any, typeArray: any, valueToRemove: any) {
  if (typeArray === 'phone') {
    const newArray = array.phones.filter((e: any) => e != valueToRemove);
    array.phones = newArray;
    return array;
  } else if (typeArray === 'email') {
    const newArray = array.emails.filter((e: any) => e != valueToRemove);
    array.emails = newArray;
    return array;
  }
}

export const ContactProvider = ({ children, queriesOptions }: any) => {
  const [contatos, setContatos] = useState(queriesOptions.data?.data || []);

  return (
    <ContactContext.Provider
      value={{
        queriesOptions: queriesOptions,
        data: { data: contatos },
        removeInfo,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

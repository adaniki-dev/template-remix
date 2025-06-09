'use client';

import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';
import { ContactColumns } from './ContactsColumns';
import ContactTable from './ContactTable';
import { useContactsContext } from '@/features/configProfile/context/contactsContext';
import { useCallback } from 'react';

export default function DataTableContact() {
  const { queriesOptions } = useContactsContext();
  const { data, isLoading } = queriesOptions;

  const handleWithEmailAndPhoneToSomeArray = useCallback(() => {
    let email = data.data?.emails;
    let phone = data.data?.phones;
    let result = [] as any;

    if (email?.length > 0) {
      const mountEmail = email.map((item: string) => ({
        value: item,
        type: 'email',
      }));
      result = result.concat(mountEmail);
    }

    if (phone?.length > 0) {
      const mountPhone = phone.map((item: string) => ({
        value: item,
        type: 'phone',
      }));
      result = result.concat(mountPhone);
    }

    return result;
  }, [data]);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        data?.data && (
          <ContactTable columns={ContactColumns} data={handleWithEmailAndPhoneToSomeArray()} />
        )
      )}
    </>
  );
}

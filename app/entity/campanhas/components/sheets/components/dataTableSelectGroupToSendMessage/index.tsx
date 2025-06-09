'use client';

import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/core/useAPI';
import { ColumnsGroupsSheet } from '@/features/campanhas/components/sheets/components/dataTableSelectGroupToSendMessage/columns';
import DataTableGroupsSheet from '@/features/campanhas/components/sheets/components/dataTableSelectGroupToSendMessage/datatable';
import { useDebounce } from '@/hooks/useDebouce';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export default function TableGroupsSheet({ handleCloseModal }: any) {
  const params = useParams<{ campaignsId: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const { data } = useApiQuery<any>(
    ['groups', params.campaignsId, searchTerm],
    `/groups/search?campaignsId=${params.campaignsId}&perPage=500&search=${searchTerm}`,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const searchAPI = async (term: string) => {
    if (term === '' || !term) {
      setSearchTerm('');
      return;
    }
    setSearchTerm(term);
  };

  useEffect(() => {
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <Input
        placeholder="Encontre seus grupos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-8"
      />
      {data && data.data && data.data.length > 0 && (
        <Fragment>
          {data.data && data.data.length > 0 && (
            <DataTableGroupsSheet
              columns={ColumnsGroupsSheet as any}
              data={data.data}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Fragment>
      )}
      {data && data.data && data.data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Nenhum grupo encontrado</p>
        </div>
      )}
    </div>
  );
}

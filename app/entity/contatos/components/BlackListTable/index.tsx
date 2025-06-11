'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { ColumnsBlackList } from './columns';
import BlackListTable from './Table';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useApiQuery } from '@/core/useAPI';
import { Fragment } from 'react';
import TableSkeleton from '@/components/ui-modified/loading/tableSkeleton';

const BLACKLIST_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    search: '',
  },
  allowedParams: ['page', 'perPage', 'search'],
};

export function DataTableBlackList() {
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(BLACKLIST_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('/blacklist', paramsUrl, paramsOrganizer);
  const { data, isLoading, isError } = useApiQuery<any>(
    createQueryKeyWithParams(['/blacklist'], paramsUrl),
    url,
  );

  return (
    <Fragment>
      {isLoading && !data && <TableSkeleton />}
      {isError && !data && <div>Erro</div>}
      {!isLoading && !isError && (
        <BlackListTable columns={ColumnsBlackList} data={data?.data || []} />
      )}
    </Fragment>
  );
}

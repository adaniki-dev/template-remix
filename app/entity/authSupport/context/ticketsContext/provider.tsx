'use client';

import { TicketContextProvinder } from './context';
import { useParams, useSearchParams } from 'next/navigation';
import { useApiQuery } from '@/core/useAPI';
import { buildUrlWithParams, createQueryKeyWithParams, createQueryParamsOrganizer } from '@/util/queryParamsUtils';

export default function TicketProviders({ children }: any) {
  const params = useParams();
  const searchParams = useSearchParams();
  const TICKETS_PARAMS = {
    defaultValues: {
      page: '1',
      perPage: '10'
    },
    allowedParams: ['page', 'perPage'],
  }

  const paramsOrganizer = createQueryParamsOrganizer(TICKETS_PARAMS)

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    tickets: params.tickets,
  })

  const url = buildUrlWithParams('tickets', paramsUrl, paramsOrganizer)
  const queryResult = useApiQuery(createQueryKeyWithParams(['tickets'], paramsUrl), url)

  return <TicketContextProvinder queryTickets={queryResult}>{children}</TicketContextProvinder>;
}

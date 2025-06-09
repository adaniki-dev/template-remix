'use client';

import { useApiQuery } from '@/core/useAPI';
import { useCampaignsByIdContext } from '@/features/campanhas/context/campaignsByIdContext';
import { CommunityProvider } from '@/features/campanhas/context/communityContext/context';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
import { useParams, useSearchParams } from 'next/navigation';

function instancesDTO(instances: any) {
  const mountedInstance = {
    id: instances.uuid,
    name: instances.key,
    isEnabled: instances.is_enabled,
    phone: instances.additional_fields?.phone,
    profilePicture: instances.additional_fields?.profilePicture,
    instanceKey: instances.key,
    groupsCount: instances.groups_count,
    quantityGroups: instances.quantity_groups,
  };
  return mountedInstance;
}

const CAMPAIGN_COMMUNITY_PARAMS_CONFIG = {
  defaultValues: {
    page: '1',
    perPage: '100',
    orderBy: 'desc',
    searchOrderBy: 'asc',
    search: '',
    activeCaptureLead: '',
    status: '',
    canMessageAdmin: '',
    capacityFilter: 'all',
    type: 'community',
  },
  allowedParams: [
    'page',
    'perPage',
    'orderBy',
    'searchOrderBy',
    'search',
    'activeCaptureLead',
    'status',
    'campaignsId',
    'canMessageAdmin',
    'capacityFilter',
    'type',
  ],
};

export function CommunityProviders({ children }: any) {
  const { queryCampaignsById } = useCampaignsByIdContext();
  const searchParams = useSearchParams();
  const params = useParams();
  const paramsOrganizer = createQueryParamsOrganizer(CAMPAIGN_COMMUNITY_PARAMS_CONFIG);

  const paramsUrl = paramsOrganizer.organizeParams({
    ...Object.fromEntries(searchParams.entries()),
    campaignsId: params.campaignsId,
  });

  const url = buildUrlWithParams('/groups/search', paramsUrl, paramsOrganizer);
  const queryGroups = useApiQuery(createQueryKeyWithParams(['/groups/search'], paramsUrl), url);

  const instances = queryCampaignsById.data?.instances;

  const queryInstances = {
    data: instances?.map(instancesDTO),
    isLoading: queryCampaignsById.isLoading,
    isError: queryCampaignsById.isError,
  };

  return (
    <CommunityProvider queryCommunity={queryGroups} queryInstances={queryInstances}>
      {children}
    </CommunityProvider>
  );
}

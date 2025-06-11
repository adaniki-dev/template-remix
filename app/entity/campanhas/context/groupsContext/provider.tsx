'use client';
import { useApiQuery } from '@/core/useAPI';
import { GroupsProvider } from './context';
import { useCampaignsByIdContext } from '@/features/campanhas/context/campaignsByIdContext';
import { useParams, useSearchParams } from 'next/navigation';
import {
  buildUrlWithParams,
  createQueryKeyWithParams,
  createQueryParamsOrganizer,
} from '@/util/queryParamsUtils';
interface GroupsProvidersProps {
  children: React.ReactNode;
}

function groupsDTO(groups: any) {
  return {
    id: groups.uuid,
    name: groups.name,
    instanceId: groups.instance_id,
    numberLimit: groups.member_limit,
    isLeadCaptureActive: groups.is_lead_capture_active,
    image: groups.image,
    description: groups.description,
    canMessageAdmin: groups.can_message_admin,
    currentMemberSize: groups.current_member_size,
    link: groups.link,
  };
}

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

const CAMPAIGN_GROUPS_PARAMS_CONFIG = {
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
    type: 'group',
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
  ],
};

export function GroupsProviders({ children }: GroupsProvidersProps) {
  const { queryCampaignsById } = useCampaignsByIdContext();
  const searchParams = useSearchParams();
  const params = useParams();

  const paramsOrganizer = createQueryParamsOrganizer(CAMPAIGN_GROUPS_PARAMS_CONFIG);

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
    <GroupsProvider queryGroups={queryGroups} queryInstances={queryInstances}>
      {children}
    </GroupsProvider>
  );
}

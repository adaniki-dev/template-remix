'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCampaignsByIdContext } from '@/features/campanhas/context/campaignsByIdContext';
import { useGroupsContext } from '@/features/campanhas/context/groupsContext';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { useSearchParams } from 'next/navigation';

enum GroupTabsEnum {
  INSTANCES = 'instancias',
  GROUPS = 'grupos',
  CONTENT = 'conteudos',
  SCHEDULING = 'agendamentos',
}

export default function ContainerMessageAndGroups() {
  const { queryCampaignsById } = useCampaignsByIdContext();
  const { queryGroups, queryInstances } = useGroupsContext();
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = queryCampaignsById;
  const { data: dataGroups } = queryGroups;
  const { data: dataInstances } = queryInstances;

  const getDefaultValue = () => {
    const tab = searchParams.get('tab') || GroupTabsEnum.GROUPS;
    if (tab == GroupTabsEnum.INSTANCES) {
      return 'instances';
    }
    if (tab == GroupTabsEnum.CONTENT) {
      return 'contents';
    }
    if (tab == GroupTabsEnum.SCHEDULING) {
      return 'schedules';
    }
    return 'groups';
  };

  const handleTabUrl = (tab: GroupTabsEnum) => {
    const { origin, pathname } = window.location;
    const newUrl = `${origin}${pathname}`;

    window.history.replaceState({}, '', newUrl);
    handleAddSearchParamsToUrl('tab', tab);
  };

  return (
    <div>
      {isLoading && !data && <Skeleton className="h-72 w-full" />}
      {isError && !data && (
        <Card>
          <CardHeader>
            <CardTitle>Erro ao carregar os dados</CardTitle>
          </CardHeader>
          <CardDescription>Erro ao carregar os dados</CardDescription>
        </Card>
      )}
      {!isLoading && !isError && data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>
              <span className="text-right">
                Grupos: {dataGroups.data?.length} / {dataInstances?.length * 10 || 0}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {/* <Tabs className="w-full" defaultValue={getDefaultValue()}>
        <TabsList className="w-full">
          <TabsTrigger
            className="w-full"
            value="instances"
            onClick={() => handleTabUrl(GroupTabsEnum.INSTANCES)}
          >
            Instâncias
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="groups"
            onClick={() => handleTabUrl(GroupTabsEnum.GROUPS)}
          >
            Grupos
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value={'contents'}
            onClick={() => handleTabUrl(GroupTabsEnum.CONTENT)}
          >
            Conteúdo
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="schedules"
            onClick={() => handleTabUrl(GroupTabsEnum.SCHEDULING)}
          >
            Agendamentos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <GroupContainer />
        </TabsContent>
        <TabsContent value="contents">
          <ContentsContainer />
        </TabsContent>
        <TabsContent value="instances">
          <InstancesContainer />
        </TabsContent>
        <TabsContent value="schedules">
          <SchedulesContainer />
        </TabsContent>
      </Tabs> */}
    </div>
  );
}

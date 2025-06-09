'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useApiQuery } from '@/core/useAPI';
import { CampaignNavigationBar } from '@/features/campanhas/components/campaingsById/components/campaignNavigationBar';
import { PopoverEditCampaigns } from '@/features/campanhas/components/campaingsById/components/campaingPopoverEditCampaign';
import { useCampaignOperations } from '@/features/campanhas/hooks/useCampaignOperations';
import { UsersRound } from 'lucide-react';
import { useParams } from 'next/navigation';
import { MdPeopleAlt } from 'react-icons/md';

export function CampaignByIdHeader({ campaignId }: { campaignId: string }) {
  const params = useParams();

  const { requestLeadInCsv } = useCampaignOperations();
  const { data, isError, isLoading } = useApiQuery<any>(
    ['campaignsById', campaignId],
    `/campaigns?id=${campaignId}`,
  );

  const handleRequestLeadInCsv = async () => {
    await requestLeadInCsv({ ids: [campaignId] });
  };

  function LoadingHeaderCampaings(){
    return (
        <Card className='h-44 w-full'>
          <CardHeader>
            <div className="flex w-full justify-between">
              <div className='space-y-1'>
                  <CardTitle>
                    <Skeleton className='w-32 h-6'/>
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className='w-32 h-3'/>
                  </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className='w-40 h-8'/>
                <Skeleton className='w-40 h-8'/>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Skeleton className='w-20 h-4'/>
                <Skeleton className='w-20 h-4'/>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {[1,2,3,4].map((item:any) => (
                <Skeleton key={item} className='rounded-md px-4 w-14 h-4'/>
              ))}
            </div>
          </CardContent>
        </Card>
    )
  }

  return (
    <div className="px-4 pt-3">
      {isLoading && !data && <LoadingHeaderCampaings/>}
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
            <div className="flex w-full justify-between">
              <div>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>
                  Descrição: {data.description ? data.description : 'Sem descrição'}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleRequestLeadInCsv} variant="secondary" size="sm">
                  <UsersRound />
                  Exportar leads
                  <span className="px-2 py-[1px] bg-yellow-500 text-xs rounded-full">BETA</span>
                </Button>
                <PopoverEditCampaigns />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="flex gap-2 items-center">
                <MdPeopleAlt />
                <CardDescription>Grupos: {data.groups?.length}</CardDescription>
              </span>

              <div className={`rounded-full px-4 ${data.status ? 'bg-green-300' : 'bg-red-400 '}`}>
                <CardDescription>
                  <span className="text-right">Status: {data.status ? 'Ativo' : 'Inativo'}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignNavigationBar />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

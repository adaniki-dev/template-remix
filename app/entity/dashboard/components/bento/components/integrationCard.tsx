'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaShop } from 'react-icons/fa6';
import { CiShop } from 'react-icons/ci';
import { Skeleton } from '@/components/ui/skeleton';

function IntegrationList({ integrations, isActive, onClick }: any) {
  if (integrations?.length === 0) {
    return <EmptyIntegrations onAddIntegration={onClick} />;
  }
  return (
    <div className="space-y-4">
      <div className="space-y-4 overflow-y-auto h-32">
        {integrations?.map((integration: any, index: any) => (
          <IntegrationItem
            key={index}
            integration={integration}
            onClick={() => onClick(integration?.id, integration?.clientIntegrationId)}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyIntegrations({ onAddIntegration }: any) {
  return (
    <div className="flex mt-4 flex-col items-center gap-3">
      <div className="rounded-full bg-blue-300 w-12 items-center justify-center flex h-12">
        <FaShop className="w-7 h-7 text-blue-200" />
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        <p className="text-sm">Nenhuma integração encontrada</p>
        <Button onClick={onAddIntegration}>Adicionar integração</Button>
      </div>
    </div>
  );
}

function IntegrationItem({ integration, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-muted/10 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <CiShop className="w-5 h-5" />
        <p className="font-bold text-sm">{integration?.name}</p>
      </div>
      <div className="bg-slate-100 p-1 rounded-md">
        <img
          src={integration?.thumbUrl}
          alt={`${integration?.name} logo`}
          className="w-6 h-6 object-contain"
        />
      </div>
    </div>
  );
}

const IntegrationItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 rounded-lg border">
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded" />
      <Skeleton className="h-5 w-24" />
    </div>
    <Skeleton className="h-6 w-6" />
  </div>
);

export default function IntegrationCard({ data, isLoading }: any) {
  const router = useRouter();
  const enabledIntegrations = data?.filter((integration: any) => integration?.isEnabled);
  const inactiveIntegrations = data?.filter((integration: any) => !integration?.isEnabled);

  const handleIntegrationActive = (id: any, clientId: any) => {
    router.push(`/dashboard/integracoes/${id}/${clientId}/detalhes/instancias`);
  };

  const handleIntegration = () => {
    router.push(`/dashboard/integracoes`);
  };

  if (isLoading) {
    return (
      <div className="col-span-1 row-span-1 w-full h-full">
        <div>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-44" />
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <Skeleton className="h-7 w-20 " />
                <Skeleton className="h-7 w-20 " />
              </div>
            </div>
          </div>
          <div className="space-y-3 px-6">
            <IntegrationItemSkeleton />
            <IntegrationItemSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 row-span-1 w-full h-full">
      <Tabs defaultValue="active" className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="text-base font-bold">Lojas Integradas</CardTitle>
              <CardDescription>Gerencie suas integrações</CardDescription>
            </div>
            <TabsList className="flex space-x-2">
              <TabsTrigger className="w-full h-full" value="active">
                Ativas
              </TabsTrigger>
              <TabsTrigger className="w-full h-full" value="inactive">
                Inativas
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="active">
            <IntegrationList
              integrations={enabledIntegrations}
              isActive={true}
              onClick={handleIntegrationActive}
            />
          </TabsContent>
          <TabsContent value="inactive">
            <IntegrationList
              integrations={inactiveIntegrations}
              isActive={false}
              onClick={handleIntegration}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </div>
  );
}

'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChannelNavigationBar } from '@/features/canais/components/channelByIdHeader/channelNavigationBar';
import { useChannelContext } from '@/features/canais/context/channelProvider';
import { GoPersonFill } from 'react-icons/go';

export function ChannelByIdHeader() {
  const { data, isLoading, isError } = useChannelContext().queryChannel;
  return (
    <div className="px-4 pt-3">
      {isLoading && !data && <Skeleton className="h-36 w-full" />}
      {isError && !data && (
        <Card>
          <CardHeader>
            <CardTitle>Desculpe, mas nao conseguimos carregar os dados do seu canal</CardTitle>
            <CardDescription>Tente novamente mais tarde</CardDescription>
          </CardHeader>
        </Card>
      )}
      {!isLoading && !isError && data && (
        <Card>
          <CardHeader>
            <div className="flex w-full items-center gap-4">
              {data && data.image && (
                <img
                  src={data.image}
                  alt="channel"
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              {!data.image && (
                <div className="h-12 w-12 rounded-full bg-slate-200 grid items-center justify-center">
                  <GoPersonFill className="text-slate-300 w-6 h-6" />
                </div>
              )}
              <div>
                <CardTitle>
                  {data?.name}{' '}
                  <span className="px-2 py-[1px] bg-yellow-500 text-white text-xs rounded-full">
                    BETA
                  </span>
                </CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChannelNavigationBar />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

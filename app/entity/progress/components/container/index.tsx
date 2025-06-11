'use client';

import { useNotificationsStore } from '@/features/dashboard/hooks/useNotificationsStore';
import { Notification } from '@/features/dashboard/hooks/useNotificationsStore/types';
import { eventStatusMessages, eventTypeMessages } from '@/providers/socketProvider/socketProvider';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

function SuccessOrFailureIconCount({
  data,
}: {
  data: {
    done?: any[];
    failed?: any[];
  };
}) {
  if ('done' in data && data.done && 'failed' in data && data.failed) {
    return (
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <ThumbsUp className="text-green-500 h-5 w-5" />
          <span className="text-green-500">{data.done.length}</span>
        </div>
        <div className="flex gap-2">
          <ThumbsDown className="text-red-500 h-5 w-5" />
          <span className="text-red-500">{data.failed.length}</span>
        </div>
      </div>
    );
  }
}

function dataContainer({ data }: any) {
  if ('url' in data && data.url) {
    // download link
    return (
      <div className="flex gap-2">
        <a href={data.url} className="text-blue-500 underline">
          Download
        </a>
      </div>
    );
  }
  if ('done' in data && data.done && 'failed' in data && data.failed) {
    return (
      <div className="grid grid-cols-2 w-full">
        {data.done.map((item: any, index: number) => (
          <div key={index} className="flex gap-2">
            <ThumbsUp className="text-green-500 h-5 w-5" />
            <span className="text-green-500">{item}</span>
          </div>
        ))}
      </div>
    );
  }
}

export function ContainerProgress() {
  const { notifications } = useNotificationsStore();

  return (
    <div className="flex flex-col items-center w-full h-screen overflow-auto">
      {notifications.length > 0 ? (
        notifications.map((notification: Notification) => (
          <div key={notification.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            <h2 className="text-lg font-semibold">{eventTypeMessages(notification.type)}</h2>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-gray-600">{eventStatusMessages(notification.status)} </p>
              {/* <SuccessOrFailureIconCount data={notification.data} /> */}
            </div>
            {notification.progressPercentage !== undefined && (
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  Progresso: {notification.progressPercentage}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${notification.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sem Processos</h1>
          <p className="mt-2 text-gray-500">
            Você nao tem nenhum pedido processando neste momento.
          </p>
        </div>
      )}
    </div>
  );
}

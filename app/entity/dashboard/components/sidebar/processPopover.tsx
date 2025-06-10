import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CircleCheck, Search } from 'lucide-react';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdNotifications } from 'react-icons/md';
import { useNotificationsStore } from '@/features/dashboard/hooks/useNotificationsStore';
import { Notification as CustomNotification } from '@/features/dashboard/hooks/useNotificationsStore/types';

const dictionary = {
  group_created: 'Criando Grupos',
  group_imported: 'Importando Grupos',
  group_updated: 'Edição de Grupos',
  group_refreshed: 'Link dos Grupos',
  contacts_csv_request: 'Solicitação de CSV',
} as const;

const dictionaryStatus = {
  processing: 'Processando',
  complete: 'Completo',
  fetching: 'Buscando',
} as const;

export function ProcessPopover() {
  const notifications = useNotificationsStore((state) => state.notifications);

  const removeNotification = useNotificationsStore((state) => state.removeNotification);
  if (notifications.length === 0)
    return (
      <Button disabled={true} size="sm" variant="outline" className="w-full">
        <MdNotifications />
        Nenhum processo
      </Button>
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="shiny-continuous" className="w-full">
          <span className="relative">
            <MdNotifications />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-1 w-1" />
            )}
          </span>
          Processos {notifications.length > 0 ? `(${notifications.length})` : ''}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <ProcessItem
              key={notification.id}
              notification={notification}
              onRemove={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface NotificationItemProps {
  notification: CustomNotification;
  onRemove: () => void;
}

function ProcessItem({ notification, onRemove }: NotificationItemProps) {
  return (
    <div
      onClick={onRemove}
      className="p-2 flex gap-4 border items-center text-sm rounded-md relative cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex-shrink-0 ">
        {notification.status === 'complete' && <CircleCheck className="text-green-400 text-3xl" />}
        {notification.status === 'processing' && (
          <AiOutlineLoading className="animate-spin text-3xl text-blue-500" />
        )}
        {notification.status === 'fetching' && <Search className="text-3xl text-gray-500" />}
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{dictionary[notification.type] || 'Notificação'}</span>
          <span className="text-xs text-gray-500">
            {notification.processedDetailItems} / {notification.totalItems}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-gray-600">
            {dictionaryStatus[notification.status] || 'Status'}
          </span>
          {notification?.data?.url ? (
            <a
              href={notification?.data.url}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="text-xs text-blue-600 hover:underline"
            >
              Fazer download
            </a>
          ) : (
            <span className="text-xs text-blue-600">{notification.progressPercentage}%</span>
          )}
        </div>

        {notification.messageError && (
          <p className="text-xs text-red-500 mt-1">{notification.messageError}</p>
        )}
      </div>
    </div>
  );
}

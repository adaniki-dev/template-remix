import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, CheckCheck, CircleCheck, Search } from 'lucide-react';
import { MdNotifications } from 'react-icons/md';
import { useApiMutation, useApiQuery } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export function NotificationPopover() {
  const { data } = useApiQuery<any>(['notifications'], '/users/notifications');
  const countNotificationsUnread =
    data?.data?.notifications?.filter((notification: any) => notification.status === 'unread')
      .length || 0;

  if (countNotificationsUnread === 0) {
    return (
      <Button disabled={true} size="sm" variant="outline" className="w-full">
        <MdNotifications />
        Sem notificações
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="shiny-continuous" className="w-full">
          <span className="relative">
            <MdNotifications />
            {countNotificationsUnread.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-1 w-1" />
            )}
          </span>
          Notificações{' '}
          {countNotificationsUnread.length > 0 ? `(${countNotificationsUnread.length})` : ''}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="w-[320px]">
        <div className="flex flex-col gap-4 py-1 overflow-y-auto">
          {data?.data?.notifications.map((notification: any) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              id={notification.id}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({ notification, id }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleRemoveNotification = useApiMutation<any, any>('/users/notifications', 'patch', {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });

  async function removeNotification(id: string) {
    setIsSubmitting(true);
    handleRemoveNotification.mutateAsync(
      {
        notifications: [
          {
            id: id,
            status: 'read',
          },
        ],
      },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  }

  return (
    <div className="flex gap-4 items-center hover:p-2 hover:shadow-md hover:border transition-all duration-200 rounded-lg">
      <button
        disabled={isSubmitting}
        onClick={() => removeNotification(id)}
        className="border rounded-md p-2 shadow-sm hover:bg-primary hover:text-primary-foreground"
      >
        {isSubmitting && <AiOutlineLoading className="animate-spin text-3xl" />}
        {notification.status === 'read' && !isSubmitting && (
          <CheckCheck className="text-green-400 text-3xl" />
        )}
        {notification.status === 'unread' && !isSubmitting && <Check className=" text-3xl " />}
      </button>
      {notification && 'data' in notification && 'url' in notification.data ? (
        <a className="text-start text-xs text-wrap" href={notification.data.url} download>
          {notification.content}
        </a>
      ) : (
        <p className="text-xs text-start text-wrap">{notification.content}</p>
      )}
    </div>
  );
}

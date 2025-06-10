import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { NotificationsStore } from './types';

const MAX_NOTIFICATIONS = 50; // Limite máximo de notificações

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    devtools(
      (set, get) => ({
        notifications: [],

        addNotification: (notification) => {
          if (!notification.id) {
            return;
          }

          set((state) => {
            // Adiciona a nova notificação no início do array (mais recente primeiro)
            const newNotifications = [notification, ...state.notifications];

            // Limita o número máximo de notificações
            if (newNotifications.length > MAX_NOTIFICATIONS) {
              newNotifications.pop(); // Remove a notificação mais antiga
            }

            return { notifications: newNotifications };
          });

          // Log do estado após adição
          const currentState = get().notifications;
        },

        updateNotification: (id, data) => {
          if (!id) {
            return;
          }

          set((state) => {
            const notificationExists = state.notifications.some((n) => n.id === id);

            if (!notificationExists) {
              return state;
            }

            const updatedNotifications = state.notifications.map((notification) =>
              notification.id === id
                ? {
                    ...notification,
                    ...data,
                    // Se o status for 'complete', garantimos 100% de progresso
                    progressPercentage:
                      data.status === 'complete'
                        ? 100
                        : (data.progressPercentage ?? notification.progressPercentage),
                  }
                : notification,
            );

            return { notifications: updatedNotifications };
          });
        },

        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        },

        clearNotifications: () => {
          set({ notifications: [] });
        },
      }),
      {
        name: 'notifications-store',
        enabled: process.env.NODE_ENV === 'development',
      },
    ),
    {
      name: 'notifications-storage',
    },
  ),
);

// Hooks auxiliares
export const useNotification = (id: string) => {
  return useNotificationsStore((state) =>
    state.notifications.find((notification) => notification.id === id),
  );
};

export const useNotifications = () => {
  return useNotificationsStore((state) => state.notifications);
};

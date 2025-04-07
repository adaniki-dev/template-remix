'use client';
import { createContext, useEffect, useState, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import io, { Socket } from 'socket.io-client';
import { useNotificationsStore } from '@/features/dashboard/hooks/useNotificationsStore';
import { toast } from 'sonner';
import { useAuthStore } from '@/core/hooks/useAuth';
import { Check, LoaderCircle, Search, X } from 'lucide-react';

type SocketContextProps = {
  socketId: string | null;
  phoneConnected: any;
  setPhoneConnected: (status: any) => void;
  socket: Socket | null;
};

export const SocketContext = createContext<SocketContextProps>({
  socketId: null,
  phoneConnected: null,
  setPhoneConnected: () => {},
  socket: null,
});

type SocketProviderProps = {
  children: ReactNode;
  token?: string;
};

type statusType = 'complete' | 'fetching' | 'processing';
type eventType = 'group_created' | 'group_updated' | 'group_imported' | 'contacts_csv_request';
type SocketEvents = {
  id: string;
  type: eventType;
  totalItems: number;
  status: statusType;
  processedDetailItems: number;
  progressPercentage: number;
  data: any;
};

export const eventTypeMessages = (eventType: eventType) =>
  ({
    group_created: 'Grupos sendo criados',
    group_updated: 'Grupos sendo atualizados',
    group_imported: 'Grupos sendo importados',
    contacts_csv_request: 'Download de contatos',
    group_refreshed: 'Grupos sendo atualizados',
    community_import: 'Comunidades importadas',
    community_create: 'Comunidades sendo criadas',
    community_update: 'Comunidades sendo atualizadas',
  })[eventType];

export const eventStatusMessages = (status: statusType) =>
  ({
    complete: 'Concluído',
    fetching: 'Buscando',
    processing: 'Processando',
  })[status];

export const IconEventStatus = (status: statusType) =>
  ({
    complete: <Check className="text-green-500 animate-pulse" />,
    fetching: <Search className="text-primary animate-pulse" />,
    processing: <LoaderCircle className="text-primary animate-spin" />,
  })[status];

const socketToast = async (event: SocketEvents) =>
  toast.custom(
    (t) => {
      const progress = Number(event.progressPercentage);

      return (
        <div className="w-96 transition-all duration-200 ease-in-out">
          <div className="w-96 bg-background p-3 rounded-lg flex flex-col gap-3 shadow relative">
            <div className="absolute -right-1 -top-2 rounded-full w-5 h-5 flex items-center justify-center">
              <button
                className="w-5 h-5 bg-background flex rounded-full items-center justify-center shadow"
                onClick={() => toast.dismiss(t)}
              >
                <X className="text-primary w-3 h-3 " />
              </button>
            </div>
            <div className="flex gap-2">
              {IconEventStatus(event.status)}
              <h1>{eventTypeMessages(event.type)}</h1>
            </div>
            <div id="loader">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">{eventStatusMessages(event.status)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className={`bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
    {
      id: event.id,
      position: 'top-center',
    },
  );

const SocketProvider = ({ children }: SocketProviderProps) => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [phoneConnected, setPhoneConnected] = useState<any>(false);
  const { addNotification, updateNotification, notifications } = useNotificationsStore();
  const { token } = useAuthStore();
  // Debug helper
  const logSocketEvent = (event: string, data: any) => {
    console.log(`[Socket Event: ${event}]`, {
      eventType: event,
      data,
      timestamp: new Date().toISOString(),
    });
  };

  useEffect(() => {
    if (!token) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
      transports: ['websocket'],
      secure: true,
      query: { token },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      if (socket.connected && socket.id) {
        setSocketId(socket.id);
      }
    };

    const onConnectedPhone = async (data: any) => {
      setPhoneConnected(data);
      await queryClient.invalidateQueries({ queryKey: ['instances'] });
    };

    const onGroupCreated = async (data: any) => {
      logSocketEvent('GROUP_CREATED', data);

      if (!data.id) {
        return;
      }
      socketToast(data);

      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'group_created',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
          data: data.data,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
          data: data.data,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['/groups/search'] });
      }
    };

    const onGroupUpdate = async (data: any) => {
      // logSocketEvent('GROUP_UPDATE', data);

      if (!data.id) {
        return;
      }
      socketToast(data);

      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'group_updated',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
          data: data.data,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
          data: data.data,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['/groups/search'] });
      }
    };

    const onGroupRefreshed = async (data: any) => {
      logSocketEvent('GROUP_UPDATE', data);

      if (!data.id) {
        return;
      }
      socketToast(data);

      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'group_updated',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['/groups/search'] });
      }
    };

    const onImportGroups = async (data: any) => {
      if (!data.id) {
        return;
      }
      socketToast(data);

      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'group_imported',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      }

      if (data.status === 'complete') {
        toast.success('Suas Importações terminaram', { position: 'top-left' });
        await queryClient.invalidateQueries({ queryKey: ['groups/search'] });
      }
    };

    const onImportCommunity = async (data: any) => {
      // logSocketEvent('IMPORT_GROUPS', data);

      if (!data.id) {
        return;
      }

      // Se é uma nova notificação
      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        toast.info(
          'Suas comunidades começaram a serem importadas, veja o progresso nas notificações',
          {
            position: 'top-left',
          },
        );
        addNotification({
          id: data.id,
          type: data.type || 'community_import',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['/groups/search'] });
      }
    };

    const onContactsCsvRequest = async (data: any) => {
      if (!data.id) {
        return;
      }
      socketToast(data);

      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'contacts_csv_request',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          ...(data?.messageError && { messageError: data.messageError }),
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          data: data.data,
          ...(data?.messageError && { messageError: data.messageError }),
        });
      }

      if (data.status === 'complete') {
        const downloadFile = async () => {
          try {
            if (!data?.data?.url) {
              throw new Error('URL não encontrada');
            }

            const response = await fetch(data.data.url);
            if (!response.ok) {
              throw new Error(`Erro no download: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = data.data.url.split('/').pop() || 'download';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            toast.success('Suas Importações terminaram', { position: 'top-left' });
            await queryClient.invalidateQueries({ queryKey: ['/groups/search'] });
          } catch (error) {
            console.error('Erro no download:', error);
            toast.error('Erro ao fazer download do arquivo');
          }
        };

        await downloadFile();
      }
    };

    const onCommunityCreated = async (data: any) => {
      if (!data.id) {
        return;
      }
      socketToast(data);

      // Se é uma nova notificação
      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'community_created',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['campaignsGroups'] });
      }
    };

    const onCommunityUpdated = async (data: any) => {
      if (!data.id) {
        return;
      }
      socketToast(data);

      // Se é uma nova notificação
      if (!useNotificationsStore.getState().notifications.find((n) => n.id === data.id)) {
        addNotification({
          id: data.id,
          type: data.type || 'community_updated',
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      } else {
        // Se é uma atualização
        updateNotification(data.id, {
          status: data.status,
          progressPercentage: data.progressPercentage || 0,
          totalItems: data.totalItems || 1,
          processedDetailItems: data.processedDetailItems || 0,
          messageError: data.messageError,
        });
      }

      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['campaignsGroups'] });
      }
    };

    const uploadProgress = async (data: any) => {
      if (data.status === 'complete') {
        await queryClient.invalidateQueries({ queryKey: ['/users/gallery'] });
      }
    };

    // Socket event listeners
    socket.on('connect', onConnect);
    socket.on('phone_connected', onConnectedPhone);
    socket.on('group_created', onGroupCreated);
    socket.on('group_updated', onGroupUpdate);
    socket.on('group_refreshed', onGroupRefreshed);
    socket.on('group_imported', onImportGroups);
    socket.on('community_import', onImportCommunity);
    socket.on('contacts_csv_request', onContactsCsvRequest);
    socket.on('upload_progress', uploadProgress);
    socket.on('community_create', onCommunityCreated);
    socket.on('community_update', onCommunityUpdated);

    return () => {
      socket.off('connect', onConnect);
      socket.off('phone_connected', onConnectedPhone);
      socket.off('group_created', onGroupCreated);
      socket.off('group_refreshed', onGroupRefreshed);
      socket.off('group_updated', onGroupUpdate);
      socket.off('group_imported', onImportGroups);
      socket.off('community_import', onImportCommunity);
      socket.off('contacts_csv_request', onContactsCsvRequest);
      socket.off('upload_progress', uploadProgress);
      socket.off('community_create', onCommunityCreated);
      socket.off('community_update', onCommunityUpdated);
    };
  }, [socket, queryClient, addNotification, updateNotification]);

  return (
    <SocketContext.Provider
      value={{
        socketId,
        phoneConnected,
        setPhoneConnected,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export type Notification = {
  id: string;
  type: 'group_created' | 'group_imported' | 'group_updated';
  status: 'processing' | 'complete' | 'fetching';
  messageError?: string;
  progressPercentage: number;
  totalItems: number;
  processedDetailItems: number;
  data?: any;
};

export type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  updateNotification: (id: string, data: Partial<Notification>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

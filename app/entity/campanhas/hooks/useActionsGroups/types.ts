export type IToggleAdminGroup = {
  campaignsId: string;
  canMessageAdmin: boolean;
  ids: string[];
};

export type IToggleCapitation = {
  campaignsId: string;
  isLeadCaptureActive: boolean;
  ids: string[];
};

export type IPhoneValidation = {
  phone: string;
};

export type IRefreshGroups = {
  campaignsId: string;
  ids: string[];
};

export type IEditGroups = {
  campaignsId: string;
  groups: {
    id: string;
    name?: string;
    picture?: string;
    memberLimit?: number;
    isLeadCaptureActive?: boolean;
    canMessageAdmin?: boolean;
    canChangeSettingsAdmin?: boolean;
    mode?: string;
  }[];
};

export type IEditCommunity = {
  campaignsId?: string;
  ids: string[];
  community: {
    name?: string;
    description?: string;
    image?: string;
    isLeadCaptureActive?: boolean;
    memberLimit?: number;
  };
};

export type IDeleteGroups = {
  campaignsId: string;
  groupIds: string[];
};

export type ICreateGroups = {
  instanceId: string;
  campaignsId: string;
  groups: {
    name: string;
    memberLimit: number;
    isLeadCaptureActive: boolean;
    canMessageAdmin: boolean;
    canChangeSettingsAdmin: boolean;
    type?: string;
  }[];
  participants: {
    phone: string;
    toAdmin: boolean;
  }[];
};

export type ICreateCommunity = {
  instanceId: string;
  campaignsId: string;
  community: {
    name: string;
    description: string;
    image?: string;
    memberLimit?: number;
    isLeadCaptureActive?: boolean;
  }[];
};

export type IPromoteContactToAdmin = {
  groupId: string;
  campaignsId: string;
  contacts: {
    phone: string;
  }[];
};

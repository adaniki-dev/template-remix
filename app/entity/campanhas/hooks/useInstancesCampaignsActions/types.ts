export type IDeleteRemoveInstancesOnCampaign = {
  campaignId: string;
  instances: string[];
};

export type IBackupInstanceOnCampaign = {
  ids: string[];
  active: boolean;
  campaignsId: string;
};

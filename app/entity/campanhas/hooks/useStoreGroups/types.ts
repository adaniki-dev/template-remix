export interface SimpleGroupData {
  campaignsId: string;
  groupIds: string[];
}

export interface GroupState {
  editGroupsIds: SimpleGroupData;
  memberLimitGroups: SimpleGroupData;
  imageGroups: SimpleGroupData;
  clearEditGroupsIds: () => void;
  clearMemberLimitGroups: () => void;
  clearImageGroups: () => void;
  setEditGroupsIds: (data: SimpleGroupData) => void;
  setMemberLimitGroups: (data: SimpleGroupData) => void;
  setImageGroups: (data: SimpleGroupData) => void;
  resetGroupStates: () => void;
}

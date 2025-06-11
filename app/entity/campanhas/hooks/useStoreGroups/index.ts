import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GroupState, SimpleGroupData } from './types';

const initialSimpleGroupState: SimpleGroupData = {
  campaignsId: '',
  groupIds: [],
};

const initialState = {
  editGroupsIds: initialSimpleGroupState,
  memberLimitGroups: initialSimpleGroupState,
  imageGroups: initialSimpleGroupState,
};

export const useGroupStore = create<GroupState>()(
  devtools(
    (set) => ({
      ...initialState,

      setEditGroupsIds: (data: SimpleGroupData) => set({ editGroupsIds: data }),
      setMemberLimitGroups: (data: SimpleGroupData) => set({ memberLimitGroups: data }),
      setImageGroups: (data: SimpleGroupData) => set({ imageGroups: data }),

      clearEditGroupsIds: () =>
        set({ editGroupsIds: initialSimpleGroupState }, false, 'clearEditGroupsIds'),
      clearMemberLimitGroups: () =>
        set({ memberLimitGroups: initialSimpleGroupState }, false, 'clearMemberLimitGroups'),
      clearImageGroups: () =>
        set({ imageGroups: initialSimpleGroupState }, false, 'clearImageGroups'),

      resetGroupStates: () =>
        set({
          editGroupsIds: initialSimpleGroupState,
          memberLimitGroups: initialSimpleGroupState,
          imageGroups: initialSimpleGroupState,
        }),
    }),
    {
      name: 'group-store',
    },
  ),
);

import { Row } from '@tanstack/react-table';
import { create } from 'zustand';

interface GroupsStore {
  groupsToReciveContent: string[];
  setGroupsToReciveContent: (groups: string[]) => void;
  clearGroupsToReciveContent: () => void;
  isChecked: (id: string) => boolean;
  onCheckedChange: (id: string) => void;
  handleSelectAll: (rows: Row<any>[], isSelected: boolean) => void;
  getSelectedState: (rows: Row<any>[]) => 'all' | 'some' | 'none';
}

export const useGroupsToSendContentStore = create<GroupsStore>((set, get) => ({
  groupsToReciveContent: [],

  setGroupsToReciveContent: (groups) => {
    set({ groupsToReciveContent: groups });
  },

  clearGroupsToReciveContent: () => {
    set({ groupsToReciveContent: [] });
  },

  isChecked: (id) => {
    const { groupsToReciveContent } = get();
    return groupsToReciveContent.includes(id);
  },

  onCheckedChange: (id: string) => {
    const { groupsToReciveContent } = get();

    if (groupsToReciveContent.includes(id)) {
      set({
        groupsToReciveContent: groupsToReciveContent.filter((groupId) => groupId !== id),
      });
    } else {
      set({
        groupsToReciveContent: [...groupsToReciveContent, id],
      });
    }
  },

  handleSelectAll: (rows: Row<any>[], isSelected: boolean) => {
    const rowIds = rows.map((row) => row.original.id);

    if (isSelected) {
      // Adiciona todos os IDs que ainda não estão selecionados
      set((state) => ({
        groupsToReciveContent: Array.from(new Set([...state.groupsToReciveContent, ...rowIds])),
      }));
    } else {
      // Remove todos os IDs da página atual
      set((state) => ({
        groupsToReciveContent: state.groupsToReciveContent.filter((id) => !rowIds.includes(id)),
      }));
    }
  },

  getSelectedState: (rows: Row<any>[]) => {
    const { groupsToReciveContent } = get();
    const pageIds = rows.map((row) => row.original.id);
    const selectedInPage = pageIds.filter((id) => groupsToReciveContent.includes(id));

    if (selectedInPage.length === 0) return 'none';
    if (selectedInPage.length === pageIds.length) return 'all';
    return 'some';
  },
}));

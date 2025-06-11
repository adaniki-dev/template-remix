import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { InstancesState } from './types';

const initialState: string[] = [];

export const useInstancesCampaignsStore = create<InstancesState>()(
  devtools(
    (set) => ({
      instances: initialState,

      setInstances: (instances: string[]) => set({ instances }, false, 'setInstances'),

      clearInstances: () => set({ instances: initialState }, false, 'clearInstances'),
    }),
    {
      name: 'instances-store',
    },
  ),
);

import { create } from 'zustand';

interface ErrorBoundaryStore {
  isOpen: boolean;
  openErrorBoundaryModal: () => void;
  closeErrorBoundaryModal: () => void;
}

export const useErrorBoundaryStore = create<ErrorBoundaryStore>((set) => ({
  isOpen: false,
  openErrorBoundaryModal: () => set({ isOpen: true }),
  closeErrorBoundaryModal: () => set({ isOpen: false }),
}));

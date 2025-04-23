import { useContext } from 'react';
import { AlertContext } from './context';

export function useAlertDialog() {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error('useAlertDialog must be used within a AlertContextProvider');
  }
  return context;
}

'use client';
import { useContext } from 'react';
import { OrderContext } from './context';

export function useOrderProvider() {
  const context = useContext(OrderContext);

  if (context === undefined) {
    throw new Error('useOrderProvider must be used within a OrdersProvider');
  }
  return context;
}

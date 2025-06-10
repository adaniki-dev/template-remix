'use client';
import { useContext } from 'react';
import { InstanceContext } from './context';

export function useInstanceContext() {
  const context = useContext(InstanceContext);

  if (context === undefined) {
    throw new Error('useInstanceContext must be used within a InstanceProvider');
  }
  return context;
}

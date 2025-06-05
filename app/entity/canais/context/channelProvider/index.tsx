'use client';
import { useContext } from 'react';
import { ChannelContext } from './context';

export function useChannelContext() {
  const context = useContext(ChannelContext);

  if (context === undefined) {
    throw new Error('useChannelContext must be used within a ChannelProvider');
  }
  return context;
}

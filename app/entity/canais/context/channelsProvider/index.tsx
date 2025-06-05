'use client';
import { useContext } from 'react';
import { ChannelsContext } from './context';

export function useChannelsContext() {
  const context = useContext(ChannelsContext);

  if (context === undefined) {
    throw new Error('useChannelsContext must be used within a ChannelsProvider');
  }
  return context;
}

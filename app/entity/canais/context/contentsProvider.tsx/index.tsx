'use client';
import { useContext } from 'react';
import { ContentsChannelContext } from './context';

export function useContentsChannelProvider() {
  const context = useContext(ContentsChannelContext);

  if (context === undefined) {
    throw new Error('useContentsChannelProvider must be used within a ContentsChannelProviders');
  }
  return context;
}

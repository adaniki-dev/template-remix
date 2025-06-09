'use client';
import { useContext } from 'react';
import { CommunityContext } from './context';

export function useCommunityContext() {
  const context = useContext(CommunityContext);

  if (context === undefined) {
    throw new Error('useCommunityContext must be used within a GroupsProviders');
  }
  return context;
}

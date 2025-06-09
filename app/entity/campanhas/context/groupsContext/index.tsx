'use client';
import { useContext } from 'react';
import { GroupsContext } from './context';

export function useGroupsContext() {
  const context = useContext(GroupsContext);

  if (context === undefined) {
    throw new Error('useGroupsContext must be used within a GroupsProviders');
  }
  return context;
}

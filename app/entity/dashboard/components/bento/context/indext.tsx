'use client';

import { useContext } from 'react';
import { SummaryContext } from './context';

export function useSummaryContext() {
  const context = useContext(SummaryContext);

  if (context === undefined) {
    throw new Error('useSummaryContext must be used within a SummaryProvider');
  }
  return context;
}

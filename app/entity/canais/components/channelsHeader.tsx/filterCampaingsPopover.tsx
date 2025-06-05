'use client';

import { Input } from '@/components/ui/input';
import { PopoverAdvancedChannelsFilter } from '@/features/canais/components/channelsHeader/advancedFilterCamapigns';
import { useDebounce } from '@/hooks/useDebouce';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useEffect, useState } from 'react';

export function FilterChannelsPopover() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const searchAPI = async (term: string) => {
    if (term === '' || !term) {
      removeSearchParamsInURL('search');
      return;
    }
    handleAddSearchParamsToUrl('search', term);
  };

  useEffect(() => {
    searchAPI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Encontre seus canais"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-8"
      />
      <PopoverAdvancedChannelsFilter />
    </div>
  );
}

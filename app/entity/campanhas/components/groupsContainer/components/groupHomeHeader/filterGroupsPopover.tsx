'use client';

import { Input } from '@/components/ui/input';
import { PopoverAdvancedFilter } from '@/features/campanhas/components/groupsContainer/components/groupHomeHeader/advancedFilterGroups';
import { useDebounce } from '@/hooks/useDebouce';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useEffect, useState } from 'react';

export function FilterGroupsPopover() {
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
        placeholder="Encontre seus grupos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-8"
      />
      <PopoverAdvancedFilter />
    </div>
  );
}

'use client';

import { Input } from '@/components/ui/input';
import { PopoverAdvancedComunityFilter } from '@/features/campanhas/components/communityContainer/components/comunityHomeHeader/advancedFilterComunity';
import { useDebounce } from '@/hooks/useDebouce';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { removeSearchParamsInURL } from '@/util/removeSearchParamsInURL';
import { useEffect, useState } from 'react';

export function FilterComunityPopover() {
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
        placeholder="Encontre suas comunidades"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-8"
      />
      <PopoverAdvancedComunityFilter />
    </div>
  );
}

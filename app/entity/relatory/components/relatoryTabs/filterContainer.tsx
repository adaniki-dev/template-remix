'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { FilterIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

export default function FilterContainer() {
  const [activeFilter, setActiveFilter] = useState<'hook' | 'integration' | null>(null);

  const handleChange = (filterChosen: 'hook' | 'integration') => {
    handleAddSearchParamsToUrl('order', filterChosen);
    setActiveFilter(activeFilter === filterChosen ? null : filterChosen);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 color-black">
          <FilterIcon className="h-5 w-5" />
          <span>Ordenar</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Ordenar informações por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={activeFilter === 'hook'}
          onClick={() => handleChange('hook')}
        >
          Hook
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilter === 'integration'}
          onClick={() => handleChange('integration')}
        >
          Integração
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

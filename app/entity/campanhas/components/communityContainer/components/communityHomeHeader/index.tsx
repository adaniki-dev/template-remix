'use client';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { FaPlus } from 'react-icons/fa';

import { FilterGroupsPopover } from '@/features/campanhas/components/groupsContainer/components/groupHomeHeader/filterGroupsPopover';
import { FilterComunityPopover } from '@/features/campanhas/components/communityContainer/components/comunityHomeHeader/filterComunityPopover';

export default function ComunityHomeHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <p className="text-base font-medium">Lista de Comunidades</p>
        <FilterComunityPopover />
      </div>

      <div className="flex gap-4">
        {/* <Button size="sm" onClick={() => handleAddSearchParamsToUrl('ImportGroups', 'y')}>
          <CiImport className="text-lg mr-2" />
          Importar grupos
        </Button> */}
        <Button size="sm" onClick={() => handleAddSearchParamsToUrl('CreateComunity', 'y')}>
          <FaPlus className="text-lg mr-2" />
          Adicionar Comunidade
        </Button>
      </div>
    </header>
  );
}

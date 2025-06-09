'use client';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';
import { FaPlus } from 'react-icons/fa';
import { CiImport } from 'react-icons/ci';
import { FilterGroupsPopover } from '@/features/campanhas/components/groupsContainer/components/groupHomeHeader/filterGroupsPopover';

export default function GroupHomeHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <p className="text-base font-medium">Lista de Grupos</p>
        <FilterGroupsPopover />
      </div>

      <div className=" flex gap-4">
        {/* <Button size="sm" onClick={() => handleAddSearchParamsToUrl('ImportGroups', 'y')}>
          <CiImport className="text-lg mr-2" />
          Importar grupos
        </Button> */}
        <Button size="sm" onClick={() => handleAddSearchParamsToUrl('CreateGroup', 'y')}>
          <FaPlus className="text-lg mr-2" />
          Adicionar grupos
        </Button>
      </div>
    </header>
  );
}

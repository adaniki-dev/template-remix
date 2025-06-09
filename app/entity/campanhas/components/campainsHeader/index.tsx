'use client';
import { Button } from '@/components/ui/button';
import { FilterCampaignsPopover } from '@/features/campanhas/components/campaignsHeader/filterCampaignsPopover';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function CampaignsHeader() {
  return (
    <header className="flex flex-col sm:flex-row h-auto sm:h-14 lg:h-[56px] items-start sm:items-center justify-between gap-4 sm:gap-4 p-2">

      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <p className="font-medium text-base sm:text-lg">Lista de Campanhas</p>
        <FilterCampaignsPopover />
      </div>

      <Button size="sm" onClick={() => handleAddSearchParamsToUrl('CreateCampaigns', 'y')}>
        Adicionar Campanhas
      </Button>
    </header>
  );
}

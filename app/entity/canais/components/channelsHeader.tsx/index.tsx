'use client';
import { Button } from '@/components/ui/button';
import { FilterChannelsPopover } from '@/features/canais/components/channelsHeader/filterCampaignsPopover';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function ChannelsHeader() {
  return (
    <header className="flex h-14 lg:h-[56px] items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <p className="font-medium">Lista de canais</p>
        <FilterChannelsPopover />
      </div>

      <Button size="sm" onClick={() => handleAddSearchParamsToUrl('CreateChannels', 'y')}>
        Adicionar canais
      </Button>
    </header>
  );
}

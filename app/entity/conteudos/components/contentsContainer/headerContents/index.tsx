'use client';
import { Button } from '@/components/ui/button';
import { FilterContentsPopover } from '@/features/conteudos/components/contentsContainer/headerContents/filterContentPopover';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function ContentsHeader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4">
      <div className="grid grid-cols-[160px_1fr] items-center">
        <p className="text-base font-medium">Lista de Conteúdo</p>
        <FilterContentsPopover />
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAddSearchParamsToUrl('contentMode', 'y')}
        >
          Agendar ou Enviar Conteúdo
        </Button>
        <Button size="sm" onClick={() => handleAddSearchParamsToUrl('CreateContents', 'y')}>
          Adicionar Conteúdo
        </Button>
      </div>
    </header>
  );
}

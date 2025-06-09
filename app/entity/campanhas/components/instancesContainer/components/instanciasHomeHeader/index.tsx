'use client';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function InstanciasHomesHeader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4">
      <div className="grid grid-cols-[160px_1fr] items-center">
        <p className="text-base font-medium">Lista de instâncias</p>
      </div>
      <Button size="sm" onClick={() => handleAddSearchParamsToUrl('AddingInstance', 'y')}>
        Adicionar Instâncias
      </Button>
    </header>
  );
}

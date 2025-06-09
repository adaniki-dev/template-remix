'use client';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function SchedulingHeader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4">
      <div className="flex gap-2 items-center">
        <p className="text-base font-semibold">Lista de agendamentos</p>
      </div>

      <Button size="sm" onClick={() => handleAddSearchParamsToUrl('contentMode', 'y')}>
        Adicionar agendamento
      </Button>
    </header>
  );
}

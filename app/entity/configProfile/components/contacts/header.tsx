'use client';
import { Button } from '@/components/ui/button';
import { handleAddSearchParamsToUrl } from '@/util/addSearchParamsInURL';

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="font-medium">Contatos administrativos</p>

      <Button size="sm" onClick={() => handleAddSearchParamsToUrl('AddAdminNumbers', 'y')}>
        Adicionar contatos
      </Button>
    </div>
  );
}

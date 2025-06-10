'use client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTableBlackList } from '../components/BlackListTable';
import { AddToBlackListForm } from '@/features/contatos/components/form/addToBlackList';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="grid  w-full overflow-hidden lg:grid-rows-[80px_1fr] p-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contatos</CardTitle>
          <CardDescription>
            Veja todos os contatos que você tem e os que estão bloqueados
          </CardDescription>
        </CardHeader>
      </Card>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <p className="text-sm">Contatos do meus leads</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center h-96 border rounded-md">
            {isLoading ? (
              <Skeleton className="w-3/4 h-6 mb-2" />
            ) : (
              <>
                <p>Estamos desenvolvendo sua lista de leads </p>
                <p>Aguarde que logo vão estar todos aqui</p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">Contatos bloqueado</p>
            <AddToBlackListForm />
          </div>
          <DataTableBlackList />
        </div>
      </div>
    </div>
  );
}

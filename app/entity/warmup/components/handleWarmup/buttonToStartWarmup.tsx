'use client';
import { Button } from '@/components/ui/button';
import { createApiErrorHandler, useApiMutation } from '@/core/useAPI';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ButtonToStartWarmup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startWarmup = useApiMutation<any, null>('/groups/warmup', 'post', {
    onSuccess: () => {
      toast.success('Warmup iniciado com sucesso');
    },
    onError: createApiErrorHandler({
      defaultMessage: 'Erro ao iniciar warmup',
      customHandlers: {
        'Instance not found': () => {
          toast.error(
            'Não foi encontrada nenhuma instância para realizar o warmup, adicione duas instância para prosseguir',
          );
        },
      },
    }),
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
  function handleWarmup() {
    setIsSubmitting(true);
    startWarmup.mutateAsync(null);
  }
  return (
    <Button size="sm" onClick={handleWarmup}>
      {isSubmitting ? 'Iniciando...' : 'Iniciar warmup'}
    </Button>
  );
}

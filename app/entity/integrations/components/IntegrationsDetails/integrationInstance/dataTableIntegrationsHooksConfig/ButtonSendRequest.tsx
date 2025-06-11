'use client';
import { Button } from '@/components/ui/button';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function ButtonSendRequestHook({
  disable,
  hookId,
}: {
  disable: boolean;
  hookId: string;
}) {
  const { clientIntegrationId } = useParams();
  const id = clientIntegrationId as string;
  const { addTemplateToHook } = useHooksActions();
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        disabled={disable}
        onClick={(e) => {
          e.stopPropagation();
          addTemplateToHook(
            { clientIntegrationId: id, hookId },
            {
              onSuccess: () => {
                toast.success('Template criado com sucesso');
              },
              onError: () => {
                toast.error('Erro ao criar template');
              },
            },
          );
        }}
      >
        Criar Template
      </Button>
    </div>
  );
}

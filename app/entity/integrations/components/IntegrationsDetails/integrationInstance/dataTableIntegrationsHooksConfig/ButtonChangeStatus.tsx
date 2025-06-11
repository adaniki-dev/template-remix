'use client';
import { Button } from '@/components/ui/button';
import { useHooksActions } from '@/features/integrations/hooks/useHooksActions';
import { toast } from 'sonner';

export default function ButtonChangeStatusHook({
  status,
  hookId,
}: {
  status: boolean;
  hookId: string;
}) {
  const { hookIntegrationToggleAdminStatus } = useHooksActions();
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          hookIntegrationToggleAdminStatus(
            { hookId },
            {
              onSuccess: () => {
                toast.success('Status alterado com sucesso');
              },
              onError: () => {
                toast.error('Erro ao alterar status');
              },
            },
          );
        }}
      >
        {status ? 'Desativar' : 'Ativar'}
      </Button>
    </div>
  );
}

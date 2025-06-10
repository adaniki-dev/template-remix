import { deleteInstanceByIdClient } from '@/features/instancia/service/client/deleteInstance';
import { MutationVariables, OptionsProps } from '@/lib/TanStackQuery/useMutate';
import toast from '@/lib/Toast/toast';

export async function deleteInstanceById(
  instanceId: string,
  callback?: {
    onSuccess?: () => void;
    onError?: () => void;
    onSettled?: () => void;
  },
  mutate?: (data: MutationVariables, options: OptionsProps) => void,
) {
  if (!mutate) {
    throw new Error('Mutate function is required');
  }
  const loading = toast.loading('Desconectando Instancia');
  mutate(
    {
      key: 'instances',
      params: '',
      fn: async () => await deleteInstanceByIdClient(instanceId),
    },
    {
      onSuccess: () => {
        toast.success('Instancia desconectada', {
          id: loading,
        });
        callback?.onSuccess?.();
      },
      onError: () => {
        toast.error('Erro ao desconectar sua instancia', {
          id: loading,
        });
        callback?.onError?.();
      },
      onSettled: () => {
        callback?.onSettled?.();
      },
    },
  );
}

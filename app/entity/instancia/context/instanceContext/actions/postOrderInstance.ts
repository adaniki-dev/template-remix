import postOrderClient from '@/features/order/services/client/postOrderClient';
import { MutationVariables, OptionsProps } from '@/lib/TanStackQuery/useMutate';
import toast from '@/lib/Toast/toast';

export async function postOrderInstance(
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
  const loading = toast.loading('Gerando um pedido de instância');
  mutate(
    {
      key: 'instances',
      params: '',
      fn: async () => await postOrderClient(),
    },
    {
      onSuccess: (data) => {
        toast.success('Instancia criada com sucesso', {
          id: loading,
        });
        if (data) {
          window.open(data.data, '_blank');
        }
        callback?.onSuccess?.();
      },
      onError: () => {
        toast.error('Erro ao gerar instancia', {
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

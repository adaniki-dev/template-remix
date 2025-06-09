import getOrderByIdClient from '@/features/order/services/client/getOrderByIdClient';
import { MutationVariables, OptionsProps } from '@/lib/TanStackQuery/useMutate';
import toast from '@/lib/Toast/toast';

export async function getOrderById(
  invoiceId: string,
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
  const loading = toast.loading('Buscando fatura');
  mutate(
    {
      key: 'instances',
      params: '',
      fn: async () => await getOrderByIdClient(invoiceId),
    },
    {
      onSuccess: (data) => {
        toast.success('Fatura encontrada', {
          id: loading,
        });
        window.open(data.data, '_blank');
        callback?.onSuccess?.();
      },
      onError: () => {
        toast.error('Erro ao buscar fatura', {
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

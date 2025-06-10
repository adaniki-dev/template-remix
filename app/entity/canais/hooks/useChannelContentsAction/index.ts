import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';

export function useChannelContentsActions() {
  const queryClient = useQueryClient();
  const deleteContents = useApiMutation<any, { id: string }>(
    (variable) => `contents?id=${variable.id}`,
    'delete',
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['contents'],
        });
      },
    },
  );
  return {
    deleteContents: deleteContents.mutateAsync,
  };
}

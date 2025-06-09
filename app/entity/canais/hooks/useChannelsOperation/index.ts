import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';

export function useChannelsOperations() {
  const queryClient = useQueryClient();
  const addChannels = useApiMutation<
    any,
    {
      name: string;
      instanceId: string;
    }
  >('/newsletter', 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/newsletter'] });
    },
  });

  const editChannel = useApiMutation<
    any,
    { name?: string; id: string; description?: string; image?: string }
  >('/newsletter', 'put', {
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['/newsletter'] });
    },
  });

  return {
    addChannels: addChannels.mutateAsync,
    editChannel: editChannel.mutateAsync,
  };
}

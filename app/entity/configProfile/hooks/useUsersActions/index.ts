import { useApiMutation } from '@/core/useAPI';
import { useQueryClient } from '@tanstack/react-query';

type utilizeContactType = {
  phones: string[];
  emails: string[];
};

const useUsersActions = () => {
  const queryClient = useQueryClient();
  const utilizeContact = useApiMutation<any, utilizeContactType>('/users', 'patch', {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/users'],
      });
    },
  });
  return {
    utilizeContact: utilizeContact.mutateAsync,
  };
};

export default useUsersActions;

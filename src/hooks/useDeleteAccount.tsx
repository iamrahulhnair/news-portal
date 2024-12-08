import { useAuthSession } from '../providers/AuthProvider.tsx';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteAccount = (
  id: number
): {
  isPending: boolean;
  deleteAccount: () => void;
} => {
  const token = useAuthSession((state) => state.token);

  const logout = useAuthSession((state) => state.logout);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_DUMMY_AUTH_ENDPOINT}users/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Error occurred');
      }
    },
    onSuccess: () => {
      logout('Successfully deleted user');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    isPending,
    deleteAccount: mutate,
  };
};

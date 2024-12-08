import { FunctionComponent, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import Loader from '../../components/ui/Loader.tsx';
import { UserProfile } from '../../store/auth.store.ts';
import DeleteAccount from '../../components/feature/DeleteAccount.tsx';
import ChangePasswordForm from '../../components/feature/ChangePasswordForm.tsx';
import ProfileForm from '../../components/feature/ProfileForm.tsx';

const ProfilePage: FunctionComponent = (): ReactElement => {
  const token = useAuthSession((state) => state.token);

  const {
    data: userProfile,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    staleTime: 0,
    queryFn: async (): Promise<UserProfile> => {
      const res = await fetch(
        `${import.meta.env.VITE_DUMMY_AUTH_ENDPOINT}auth/me`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Error occurred');
      }
      return res.json();
    },
  });

  if (isPending) {
    return <Loader className='static' />;
  }

  if (isError || !userProfile) {
    return <div>{'message' in error ? error.message : 'Error occurred'}</div>;
  }

  return (
    <div className='h-full overflow-y-auto px-4 pb-4'>
      <ProfileForm userProfile={userProfile} />
      {userProfile?.id && <DeleteAccount id={userProfile.id} />}
      <ChangePasswordForm />
    </div>
  );
};

export default ProfilePage;

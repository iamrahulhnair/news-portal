import { FunctionComponent, ReactElement, useEffect } from 'react';
import { UserProfile } from '../../store/auth.store.ts';
import InputControl from '../form-controls/InputControl.tsx';
import {
  PROFILE_SCHEMA,
  ProfileFormSchema,
} from '../../config/form-schema/profile.schema.ts';
import { Button } from '@nextui-org/react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  userProfile: UserProfile;
}

const ProfileForm: FunctionComponent<Props> = ({
  userProfile,
}): ReactElement => {
  const token = useAuthSession((state) => state.token);

  const updateProfile = useAuthSession((state) => state.updateProfile);

  const profile = useAuthSession((state) => state.profile);

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(PROFILE_SCHEMA),
    mode: 'onChange',
  });

  const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation<
    UserProfile,
    DefaultError,
    ProfileFormSchema
  >({
    mutationFn: async ({ username }): Promise<UserProfile> => {
      const response = await fetch(
        `${import.meta.env.VITE_DUMMY_AUTH_ENDPOINT}users/${userProfile?.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error updating user profile');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Profile successfully updated!');
      if (!profile) return;
      updateProfile({
        ...profile,
        username: getValues().username,
      });

      reset(
        {
          ...getValues(),
        },
        {
          keepDirty: false,
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    reset({
      username: userProfile?.username,
      email: userProfile?.email,
    });
  }, [userProfile]);

  return (
    <form
      onSubmit={handleSubmit((formData) => updateProfileMutation(formData))}
    >
      <h1 className='text-2xl font-bold text-primary'>Profile</h1>

      <div className='mt-4 grid gap-4'>
        <InputControl<ProfileFormSchema>
          control={control}
          name='email'
          label='Email'
          isReadOnly
        />
        <InputControl<ProfileFormSchema>
          control={control}
          name='username'
          label='Display Name'
          isRequired
        />

        <Button
          type='submit'
          color='primary'
          className='ml-auto w-max'
          isLoading={isUpdating}
          isDisabled={!isValid || !isDirty}
        >
          Update profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;

import { FunctionComponent, ReactElement, useEffect, useRef } from 'react';
import {
  CHANGE_PASSWORD_SCHEMA,
  ChangePasswordFormSchema,
} from '../../config/form-schema/password.schema.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordControl from '../form-controls/PasswordControl.tsx';
import { Button } from '@nextui-org/react';
import { toast } from 'sonner';

const ChangePasswordForm: FunctionComponent = (): ReactElement => {
  const {
    control,
    watch,
    trigger,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(CHANGE_PASSWORD_SCHEMA),
    mode: 'onTouched',
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const formValue = watch();

  const updatePassword = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Password changed successfully.');
    reset({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    formRef.current?.reset();
  };

  // * Effects
  useEffect(() => {
    if (!formValue.newPassword || !formValue.confirmNewPassword) return;

    trigger('confirmNewPassword').then();
  }, [formValue.newPassword]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(updatePassword)}
      className='mt-8 grid gap-4 border-t-1 border-gray-500 border-opacity-25 pt-4'
    >
      <h1 className='text-2xl font-bold text-primary'>Change Password</h1>
      <PasswordControl<ChangePasswordFormSchema>
        control={control}
        name='currentPassword'
        isRequired
        label='Current Password'
      />

      <PasswordControl<ChangePasswordFormSchema>
        control={control}
        name='newPassword'
        label='New Password'
        isRequired
      />

      <PasswordControl<ChangePasswordFormSchema>
        control={control}
        name='confirmNewPassword'
        label='Confirm new Password'
        isRequired
      />
      <Button
        type='submit'
        color='primary'
        className='ml-auto w-max'
        isLoading={isSubmitting}
        isDisabled={!isValid}
      >
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;

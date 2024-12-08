import { FunctionComponent, ReactElement } from 'react';
import InputControl from '../../components/form-controls/InputControl.tsx';
import { LoginFormSchema } from '../../config/form-schema/login.schema.ts';
import { useHandleLogin } from '../../hooks/useHandleLogin.tsx';
import CheckboxControl from '../../components/form-controls/CheckboxControl.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes.ts';
import { Button } from '@nextui-org/react';
import PasswordControl from '../../components/form-controls/PasswordControl.tsx';

const LoginPage: FunctionComponent = (): ReactElement => {
  const { formRef, isSubmitting, loginMutation } = useHandleLogin();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = formRef;

  const loginRequest = (formData: LoginFormSchema) => {
    loginMutation(formData);
  };

  return (
    <form
      className='mx-auto mt-6 w-full max-w-3xl rounded-xl p-4 shadow-xl'
      noValidate
      autoFocus
      onSubmit={handleSubmit(loginRequest)}
    >
      <h1 className='my-4 text-xl font-semibold'>Login</h1>
      <div className='grid gap-4'>
        <InputControl<LoginFormSchema>
          control={control}
          name='email'
          label='Email'
          placeholder='Enter Email'
          isRequired
        />

        <PasswordControl<LoginFormSchema>
          control={control}
          name='password'
          label='Password'
          isRequired
        />
        <div className='flex items-center justify-between pl-3'>
          <CheckboxControl<LoginFormSchema>
            control={control}
            name='rememberMe'
            label='Remember Me'
          />
          <span>
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.REGISTER}
              className='ml-1 font-semibold text-primary'
            >
              Create Account
            </Link>
          </span>
        </div>

        <Button
          isLoading={isSubmitting}
          isDisabled={!isValid}
          color='primary'
          type='submit'
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;

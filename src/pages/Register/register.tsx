import { FunctionComponent, ReactElement } from 'react';
import { RegisterFormSchema } from '../../config/form-schema/register.schema.ts';
import { Button } from '@nextui-org/react';
import InputControl from '../../components/form-controls/InputControl.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes.ts';
import { Spinner } from '@nextui-org/spinner';
import { CircleCheck } from 'lucide-react';
import {
  EmailValidationState,
  useHandleRegister,
} from '../../hooks/useHandleRegister.tsx';
import PasswordControl from '../../components/form-controls/PasswordControl.tsx';

const RegisterPage: FunctionComponent = (): ReactElement => {
  const { formRef, emailState, isSubmitting, registerMutation } =
    useHandleRegister();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formRef;

  return (
    <form
      className='mx-auto mt-6 w-full max-w-3xl rounded-xl p-4 shadow-xl'
      onSubmit={handleSubmit(registerMutation)}
    >
      <h1 className='my-4 text-xl font-semibold'>Register</h1>
      <div className='grid gap-4'>
        <InputControl<RegisterFormSchema>
          control={control}
          name='email'
          label='Email'
          placeholder='Enter Email'
          isRequired
          endContent={
            <>
              {emailState === EmailValidationState.LOADING && (
                <Spinner size='sm' color='primary' />
              )}
              {emailState === EmailValidationState.VALID && (
                <CircleCheck className='text-success-600' />
              )}
            </>
          }
          isDisabled={emailState === EmailValidationState.LOADING}
        />

        <InputControl<RegisterFormSchema>
          control={control}
          name='name'
          label='Display Name'
          placeholder='Enter Display Name'
          isRequired
        />

        <PasswordControl<RegisterFormSchema>
          control={control}
          name='password'
          label='Password'
          isRequired
        />

        <PasswordControl<RegisterFormSchema>
          control={control}
          name='confirmPassword'
          label='Confirm Password'
          isRequired
        />
        <span className='mx-auto block w-max'>
          Already have an account ?{' '}
          <Link className='ml-1 font-semibold text-primary' to={ROUTES.LOGIN}>
            Login
          </Link>
        </span>

        <Button
          isLoading={isSubmitting}
          isDisabled={!isValid || emailState === EmailValidationState.LOADING}
          color='primary'
          type='submit'
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;

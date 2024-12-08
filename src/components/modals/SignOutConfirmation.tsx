import { FunctionComponent, ReactElement, useState } from 'react';
import { Button } from '@nextui-org/button';
import { UseDisclosureReturn } from '@nextui-org/use-disclosure';
import { ActionState } from '../../config/app.config.ts';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import { toast } from 'sonner';
import Loader from '../ui/Loader.tsx';
import Modal from '../ui/Modal.tsx';

const SignOutConfirmation: FunctionComponent<
  Pick<UseDisclosureReturn, 'isOpen' | 'onClose' | 'onOpenChange'>
> = ({ isOpen, onClose, onOpenChange }): ReactElement => {
  const [actionState, setActionState] = useState(ActionState.IDLE);

  const logout = useAuthSession((state) => state.logout);

  // * Private Methods
  const confirmLogout = async () => {
    try {
      setActionState(ActionState.LOADING);
      onClose();
      logout();
    } catch (e) {
      console.log(e);
      toast.error('Error occurred');
    } finally {
      setActionState(ActionState.IDLE);
    }
  };

  return (
    <>
      {actionState === ActionState.LOADING && <Loader />}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Are you sure '
        size='md'
        className='items-center !p-10'
        classNames={{
          base: '!p-10',
          header: 'p-10 justify-center',
        }}
        footer={
          <div className='flex w-full items-center justify-center gap-4 pb-2'>
            <Button
              radius='full'
              size='lg'
              color='danger'
              onPress={confirmLogout}
            >
              Yes
            </Button>
            <Button
              radius='full'
              size='lg'
              variant='bordered'
              color='default'
              onPress={onClose}
            >
              No
            </Button>
          </div>
        }
      >
        <div className='mx-auto w-fit py-2 text-center'>
          <p className='font-medium'>Are you sure do you want to logout?</p>
        </div>
      </Modal>
    </>
  );
};

export default SignOutConfirmation;

import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Button } from '@nextui-org/button';
import Loader from '../ui/Loader.tsx';
import Modal from '../ui/Modal.tsx';

interface Props extends PropsWithChildren {
  loading?: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
  type?: 'DELETE' | 'CONFIRMATION';
  primaryActionLabel: string;
  isSubmitting?: boolean;
}

const ConfirmationModal: FunctionComponent<Props> = ({
  loading,
  isOpen,
  onOpenChange,
  title = 'Confirmation',
  children,
  onClose,
  onConfirm,
  type = 'CONFIRMATION',
  primaryActionLabel,
  isSubmitting = false,
}): ReactElement => {
  return (
    <>
      {!!loading && <Loader />}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='md'
        className='items-center !p-10'
        classNames={{
          base: '!p-10',
          header: 'p-10 justify-center',
        }}
        title={title}
        footer={
          <div className='flex w-full items-center justify-center gap-4 pb-2'>
            <Button
              radius='full'
              size='lg'
              color={type === 'CONFIRMATION' ? 'primary' : 'danger'}
              onPress={onConfirm}
              isLoading={isSubmitting}
            >
              {primaryActionLabel}
            </Button>

            <Button
              radius='full'
              size='lg'
              color={type === 'CONFIRMATION' ? 'danger' : 'default'}
              variant={type === 'CONFIRMATION' ? 'flat' : 'light'}
              onPress={onClose}
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        }
      >
        <div className='mx-auto w-fit py-2 text-center'>
          <p className='font-medium'>{children}</p>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;

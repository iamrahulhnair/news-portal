import { FunctionComponent, ReactElement } from 'react';
import { Button } from '@nextui-org/react';
import { useDisclosure } from '@nextui-org/modal';
import ConfirmationModal from '../modals/ConfirmationModal.tsx';
import { useDeleteAccount } from '../../hooks/useDeleteAccount.tsx';

interface Props {
  id: number;
}

const DeleteAccount: FunctionComponent<Props> = ({ id }): ReactElement => {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();

  const { deleteAccount, isPending } = useDeleteAccount(id);

  return (
    <>
      <Button color='danger' className='mt-4 w-full' onPress={onOpen}>
        Delete Account
      </Button>

      <ConfirmationModal
        isSubmitting={isPending}
        isOpen={isOpen}
        type='DELETE'
        onOpenChange={onOpenChange}
        onClose={onClose}
        onConfirm={deleteAccount}
        primaryActionLabel='Delete'
      >
        Are you sure want to delete your account ?
      </ConfirmationModal>
    </>
  );
};

export default DeleteAccount;

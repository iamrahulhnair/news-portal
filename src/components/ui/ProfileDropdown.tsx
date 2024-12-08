import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { FunctionComponent, ReactNode } from 'react';
import { useDisclosure } from '@nextui-org/modal';
import { Skeleton } from '@nextui-org/skeleton';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import { AuthState } from '../../store/auth.store.ts';
import SignOutConfirmation from '../modals/SignOutConfirmation.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes.ts';

const ProfileDropdown: FunctionComponent = (): ReactNode => {
  const authState = useAuthSession((state) => state.authState);

  const profile = useAuthSession((state) => state.profile);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const navigation = useNavigate();

  if (authState === AuthState.LOADING) {
    return <Skeleton className='ml-auto size-10 rounded-lg' />;
  }

  return (
    <>
      {authState === AuthState.AUTHENTICATED && profile && (
        <>
          <div className='ml-auto flex max-w-max items-center gap-4'>
            <Dropdown backdrop='opaque' placement='bottom-end'>
              <DropdownTrigger>
                <Avatar
                  as='button'
                  src={profile.image}
                  className='bsize-10 rounded-lg'
                  name={profile.username}
                />
              </DropdownTrigger>
              <DropdownMenu variant='flat'>
                <DropdownItem isDisabled key='userinfo'>
                  <p className='text-xl font-bold text-primary'>
                    Hi, {profile.username}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key='profile'
                  color='danger'
                  onPress={() => {
                    navigation(ROUTES.PROFILE);
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem key='logout' color='danger' onPress={onOpen}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <SignOutConfirmation
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        </>
      )}
    </>
  );
};

export default ProfileDropdown;

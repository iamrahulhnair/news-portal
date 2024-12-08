import { FunctionComponent, ReactElement, ReactNode } from 'react';
import {
  Modal as NextModal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalProps as NextModalProps,
} from '@nextui-org/react';

interface CustomModalProps extends Omit<NextModalProps, 'title'> {
  title?: ReactNode;
  footer?: ReactElement;
  children: ReactNode;
  className?: string;
}

const Modal: FunctionComponent<CustomModalProps> = ({
  title,
  children,
  footer,
  isOpen,
  onOpenChange,
  onClose,
  size,
  className,
  hideCloseButton,
  isDismissable,
}): ReactElement => {
  return (
    <NextModal
      placement='center'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={size}
      isDismissable={isDismissable}
      scrollBehavior='outside'
      hideCloseButton={hideCloseButton}
      className={`!my-auto scroll-smooth max-sm:!mx-4 ${className}`}
      classNames={{
        backdrop: 'backdrop-blur-2xl',
        wrapper: 'z-[9999]',
        footer: 'w-full py-0',
        header: 'justify-center',
      }}
    >
      <ModalContent>
        <ModalHeader className='flex gap-1 text-xl font-bold md:text-2xl'>
          {title}
        </ModalHeader>
        <ModalBody className='relative'>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </NextModal>
  );
};

export default Modal;

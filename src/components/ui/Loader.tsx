import { FunctionComponent, ReactElement } from 'react';
import { Spinner } from '@nextui-org/spinner';
import { mergeClass } from '../../config/tailwind.config.ts';

const Loader: FunctionComponent<{
  className?: string;
}> = ({ className }): ReactElement => {
  return (
    <div
      className={mergeClass(
        'bg-gray fixed inset-0 z-[999] grid place-content-center bg-opacity-60 backdrop-blur-2xl',
        className
      )}
    >
      <Spinner size='lg' color='primary' />
    </div>
  );
};

export default Loader;

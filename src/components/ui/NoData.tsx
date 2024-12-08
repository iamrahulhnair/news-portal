import { FunctionComponent, ReactElement } from 'react';
import { Image } from '@nextui-org/react';
import { mergeClass } from '../../config/tailwind.config.ts';

interface Props {
  containerClassName?: string;
  content: string;
}

const NoData: FunctionComponent<Props> = ({
  containerClassName,
  content,
}): ReactElement => {
  return (
    <div
      className={mergeClass(
        'flex h-full w-full flex-col items-center justify-center gap-2 p-4',
        containerClassName
      )}
    >
      <Image
        width='48'
        height='48'
        src='https://img.icons8.com/color/48/nothing-found.png'
        alt='no data'
        classNames={{
          wrapper: 'w-max',
        }}
      />
      <span className='w-max'>{content}</span>
    </div>
  );
};

export default NoData;

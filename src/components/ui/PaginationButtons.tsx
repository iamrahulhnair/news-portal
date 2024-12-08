import { Button } from '@nextui-org/react';
import {
  Dispatch,
  FunctionComponent,
  ReactElement,
  SetStateAction,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  isLoading: boolean;
  isFinalPage?: boolean;
}

const PaginationButtons: FunctionComponent<Props> = ({
  currentPage,
  setPage,
  isLoading,
  isFinalPage,
}): ReactElement => {
  return (
    <div className='col-span-full flex items-center justify-between gap-4'>
      <Button
        variant='solid'
        color='primary'
        isDisabled={currentPage === 0 || isLoading}
        onPress={() => {
          setPage((prev) => prev - 1);
        }}
        startContent={<ChevronLeft />}
      >
        Prev Page
      </Button>
      Current Page : {currentPage + 1}
      <Button
        variant='solid'
        color='primary'
        isDisabled={isLoading || isFinalPage}
        onPress={() => {
          setPage((prev) => prev + 1);
        }}
        endContent={<ChevronRight />}
      >
        Next Page
      </Button>
    </div>
  );
};

export default PaginationButtons;

import {
  Children,
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginatedApiResponse } from '../../config/app.config.ts';
import { ArticlesData } from '../../config/news.config.ts';
import ArticlesCard from '../ui/ArticlesCard.tsx';
import { Skeleton } from '@nextui-org/skeleton';
import PaginationButtons from '../ui/PaginationButtons.tsx';

interface Props {
  activeFilter: string;
}

const Articles: FunctionComponent<Props> = ({ activeFilter }): ReactElement => {
  const [page, setPage] = useState(0);

  const LIMIT = 20;

  const { data, isFetching, isPending, isError, error } = useQuery({
    queryKey: ['articles', activeFilter, page],
    staleTime: 5 * 60 * 1000,
    enabled: !!activeFilter,
    placeholderData: keepPreviousData,
    queryFn: async ({
      signal,
    }): Promise<PaginatedApiResponse<ArticlesData>> => {
      const res = await fetch(
        `${import.meta.env.VITE_NEW_YORK_TIMES_ENDPOINT}all/${activeFilter}.json?api-key=${import.meta.env.VITE_NEW_YORK_TIMES_API_KEY}&limit=${LIMIT}&offset=${page * LIMIT}`,
        {
          method: 'GET',
          signal,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (!res.ok) {
        throw new Error('Error getting articles');
      }
      return await res.json();
    },
  });

  useEffect(() => {
    setPage(0);
  }, [activeFilter]);

  const articles = data?.results;
  return (
    <section className='col-span-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-4 overflow-y-auto border-l-1 border-gray-200 px-4 pb-4'>
      {(isPending || isFetching) && (
        <Skeleton className='h-full max-h-32 rounded-2xl' />
      )}

      {!isPending && !isFetching && !isError && (
        <>
          {Children.toArray(
            articles?.map((article) => <ArticlesCard articleData={article} />)
          )}
        </>
      )}

      {isError && (
        <span className='col-span-full rounded-xl bg-danger-100 p-3 text-danger-500'>
          {error?.message ?? 'Error occurred'}
        </span>
      )}

      {!isError && !isFetching && !isPending && (
        <PaginationButtons
          currentPage={page}
          setPage={setPage}
          isLoading={isPending || isFetching}
        />
      )}
    </section>
  );
};

export default Articles;

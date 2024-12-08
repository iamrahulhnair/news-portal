import { Children, FunctionComponent, ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../ui/Loader.tsx';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { useDebounceFunction } from '../../hooks/useDebounceFunction.ts';
import { PaginatedApiResponse } from '../../config/app.config.ts';
import { SectionsData } from '../../config/news.config.ts';

interface Props {
  activeFilter: string;
  updateFilter: (filter: string) => void;
  debounceDelay?: number;
}

const Sections: FunctionComponent<Props> = ({
  activeFilter,
  updateFilter,
  debounceDelay,
}): ReactElement => {
  const [filter, setFilter] = useState<string>(activeFilter);

  const { data, isPending } = useQuery({
    queryKey: ['sections'],
    staleTime: 30 * 60 * 1000,
    queryFn: async (): Promise<string[]> => {
      const res = await fetch(
        `${import.meta.env.VITE_NEW_YORK_TIMES_ENDPOINT}section-list.json?api-key=${import.meta.env.VITE_NEW_YORK_TIMES_API_KEY}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const sectionResponse =
        (await res.json()) as PaginatedApiResponse<SectionsData>;

      const results = sectionResponse.results.map(({ section }) => section);

      return ['all', ...new Set(results)];
    },
  });

  useDebounceFunction(
    () => {
      if (filter === activeFilter) return;
      updateFilter(filter);
    },
    [filter],
    debounceDelay ?? 500
  );

  if (isPending) {
    return <Loader />;
  }

  return (
    <aside className='broder-r-1 col-span-2 h-full space-y-4 overflow-y-auto border-gray-800 pb-4 pr-4'>
      <RadioGroup
        label='Filter article based on Section'
        defaultValue={activeFilter}
        onValueChange={setFilter}
      >
        {Children.toArray(
          data?.map((section) => (
            <Radio className='capitalize' value={section}>
              {section}
            </Radio>
          ))
        )}
      </RadioGroup>
    </aside>
  );
};

export default Sections;

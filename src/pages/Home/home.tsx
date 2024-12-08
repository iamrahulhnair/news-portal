import { FunctionComponent, ReactElement, useState } from 'react';

import Sections from '../../components/feature/Sections.tsx';
import Articles from '../../components/feature/Articles.tsx';

const HomePage: FunctionComponent = (): ReactElement => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <div className='grid h-full grid-cols-8'>
      <Sections activeFilter={activeFilter} updateFilter={setActiveFilter} />

      <Articles activeFilter={activeFilter} />
    </div>
  );
};

export default HomePage;

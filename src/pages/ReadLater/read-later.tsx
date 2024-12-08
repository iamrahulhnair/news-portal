import { Children, FunctionComponent, ReactElement, useState } from 'react';
import Sections from '../../components/feature/Sections.tsx';
import { useArticleReadLater } from '../../providers/ArticleProvider.tsx';
import ArticlesCard from '../../components/ui/ArticlesCard.tsx';
import NoData from '../../components/ui/NoData.tsx';
import PaginationButtons from '../../components/ui/PaginationButtons.tsx';

const ReadLaterPage: FunctionComponent = (): ReactElement => {
  const [activeFilter, setActiveFilter] = useState('all');

  const [page, setPage] = useState(0);

  const ARTICLE_PER_PAGE = 10;

  const readLaterArticles = useArticleReadLater(
    (state) => state.readLaterArticles
  );

  const filteredArticles = readLaterArticles.filter(
    ({ section }) => section === activeFilter || activeFilter === 'all'
  );

  const totalPages = Math.ceil(filteredArticles.length / ARTICLE_PER_PAGE);

  const articles = filteredArticles.slice(
    page * ARTICLE_PER_PAGE,
    (page + 1) * ARTICLE_PER_PAGE
  );

  return (
    <div className='grid h-full grid-cols-8'>
      <Sections
        activeFilter={activeFilter}
        updateFilter={(filter) => {
          setActiveFilter(filter);
          setPage(0);
        }}
        debounceDelay={0}
      />
      <section className='col-span-6 grid h-max max-h-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-start gap-4 overflow-y-auto border-l-1 border-gray-200 px-4 pb-4'>
        {Children.toArray(
          articles.map((article) => (
            <ArticlesCard articleData={article} hideThumbnails />
          ))
        )}
        {articles.length === 0 ? (
          <NoData content='No articles found' containerClassName='col-span-6' />
        ) : (
          <PaginationButtons
            currentPage={page}
            setPage={setPage}
            isLoading={false}
            isFinalPage={page === totalPages - 1}
          />
        )}
      </section>
    </div>
  );
};

export default ReadLaterPage;

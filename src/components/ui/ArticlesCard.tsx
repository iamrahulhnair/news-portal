import { CSSProperties, FunctionComponent, ReactElement } from 'react';
import { ArticlesData } from '../../config/news.config.ts';
import { Button, Image } from '@nextui-org/react';
import { formatDate } from '../../config/date.config.ts';
import { Link } from 'react-router-dom';
import { useArticleReadLater } from '../../providers/ArticleProvider.tsx';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { mergeClass } from '../../config/tailwind.config.ts';

interface Props {
  articleData: ArticlesData;
  hideThumbnails?: boolean;
}

const ArticlesCard: FunctionComponent<Props> = ({
  articleData,
  hideThumbnails,
}): ReactElement => {
  const { title, slug_name, abstract, multimedia, published_date, url } =
    articleData;

  const newsImage =
    multimedia[0]?.url ?? 'https://img.icons8.com/3d-fluency/94/newspaper.png';

  const readLaterSlugs = useArticleReadLater((state) => state.readLaterSlugs);

  const markedAsReadLater =
    readLaterSlugs.findIndex((s) => s === slug_name) !== -1;

  const markForReadLater = useArticleReadLater(
    (state) => state.markForReadLater
  );

  const removeFromReadLater = useArticleReadLater(
    (state) => state.removeFromReadLater
  );

  return (
    <Link
      to={url}
      target='_blank'
      title={title}
      className='flex cursor-pointer gap-2 rounded-2xl border-1 border-gray-200 p-4 shadow-default'
    >
      {!hideThumbnails && (
        <Image
          className='size-16 min-w-16 bg-gray-200'
          src={newsImage}
          alt={title}
        />
      )}
      <div className='w-full overflow-hidden'>
        <h1 className='truncate font-semibold leading-none text-default-600'>
          {title}
        </h1>
        <p
          className='truncated-text mt-1 min-h-10 text-sm text-default-500'
          style={{ '--lines': 2 } as CSSProperties}
        >
          {abstract}
        </p>
        <div className='mt-2.5 flex items-center justify-between border-t-1 border-gray-200 pt-1'>
          <span className='text-right text-xs italic text-default-500'>
            {formatDate(published_date)}
          </span>
          <Button
            isIconOnly
            size='sm'
            variant='flat'
            color='default'
            className={mergeClass(markedAsReadLater && 'bg-orange-300')}
            onPress={() => {
              if (markedAsReadLater) {
                removeFromReadLater(slug_name);
              } else {
                markForReadLater(articleData);
              }
            }}
          >
            {markedAsReadLater ? (
              <BookmarkCheck className='text-white' />
            ) : (
              <Bookmark className='text-default-400' />
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ArticlesCard;

import { ArticlesData } from '../config/news.config.ts';
import { StoreApi } from 'zustand/index';

export interface ArticleReadLaterState {
  readLaterArticles: ArticlesData[];
  readLaterSlugs: string[];
  markForReadLater: (article: ArticlesData) => void;
  removeFromReadLater: (slug: string) => void;
}

export const articleReadLaterStoreCreateFn = (
  setState: StoreApi<ArticleReadLaterState>['setState'],
  getState: StoreApi<ArticleReadLaterState>['getState']
): ArticleReadLaterState => ({
  readLaterArticles: [],
  readLaterSlugs: [],
  markForReadLater: (article) => {
    const { readLaterArticles, readLaterSlugs } = getState();
    setState({
      readLaterArticles: [...readLaterArticles, article],
      readLaterSlugs: [...readLaterSlugs, article.slug_name],
    });
  },
  removeFromReadLater: (slug: string) => {
    const { readLaterArticles } = getState();

    const updateArticles = readLaterArticles.filter(
      ({ slug_name }) => slug_name !== slug
    );
    setState({
      readLaterArticles: updateArticles,
      readLaterSlugs: updateArticles.map(({ slug_name }) => slug_name),
    });
  },
});

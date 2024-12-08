import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { StoreApi } from 'zustand';
import {
  ArticleReadLaterState,
  articleReadLaterStoreCreateFn,
} from '../store/article.store.ts';
import { createStore, useStore } from 'zustand/index';
import { persist } from 'zustand/middleware';

const ArticleContext = createContext<StoreApi<ArticleReadLaterState> | null>(
  null
);

const ArticleProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [articleState] = useState(() =>
    createStore(
      persist<
        ArticleReadLaterState,
        [],
        [],
        Pick<ArticleReadLaterState, 'readLaterArticles' | 'readLaterSlugs'>
      >(articleReadLaterStoreCreateFn, {
        name: 'article',
        partialize: (state) => ({
          readLaterSlugs: state.readLaterSlugs,
          readLaterArticles: state.readLaterArticles,
        }),
      })
    )
  );

  return (
    <ArticleContext.Provider value={articleState}>
      {children}
    </ArticleContext.Provider>
  );
};

export function useArticleReadLater<T>(
  selector: (state: ArticleReadLaterState) => T
): T {
  const _ctx = useContext(ArticleContext);

  if (!_ctx) {
    throw new Error('useArticleReadLater must be used within ArticleProvider');
  }

  return useStore(_ctx, selector);
}

export default ArticleProvider;

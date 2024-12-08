export interface SectionsData {
  section: string;
}

export interface ArticlesData {
  slug_name: string;
  title: string;
  abstract: string;
  published_date: string;
  section: string;
  url: string;
  multimedia: {
    url: string;
  }[];
}

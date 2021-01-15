export type ArticleBase = {
  title: string;
  text: string;
};

export type Article = ArticleBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

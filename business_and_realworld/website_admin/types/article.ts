export type Article = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type ArticleOrders = keyof Article | `-${keyof Article}`;

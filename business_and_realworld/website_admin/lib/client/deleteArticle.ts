export const deleteArticle = async (id: string): Promise<void> => {
  await fetch(`/api/articles/delete?id=${id}`);
};

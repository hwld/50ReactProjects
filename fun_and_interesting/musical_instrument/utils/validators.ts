/**
 *
 * @param keys キー名の配列
 * @param key キー名
 * @returns keysにkeyが含まれていないか (keyが空文字だった場合はtrue)
 */
export const isKeyNotIncluded = (keys: string[], key: string): boolean => {
  return keys.every(
    (existingKey) => existingKey.toUpperCase() !== key.toUpperCase()
  );
};

/**
 *
 * @param keys キー名の配列
 * @param key keysに含まれるキー名
 * @returns keysにkeyが1つだけ含まれているか (keyが空文字だった場合はtrue)
 */
export const isUniqueKey = (keys: string[], key: string): boolean => {
  return (
    keys.filter(
      (edittingKey) => edittingKey.toUpperCase() === key.toUpperCase()
    ).length === 1
  );
};

export const isEmptyString = (key: string): boolean => {
  return key === "";
};

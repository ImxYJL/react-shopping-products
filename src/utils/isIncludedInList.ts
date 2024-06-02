export const isIncludedInList = <T>(value: unknown, list: T[]): value is T => {
  return list.includes(value as T);
};

export default function removeDuplicates<T, K extends keyof T>(
  array1: T[],
  array2: T[],
  key1: K,
  key2: K,
): T[] {
  if (!array1 || !array2 || array2.length === 0) return array1;
  return array2.filter(
    (array2Item) =>
      !array1.some((array1Item) => array1Item[key1] === array2Item[key2]),
  );
}

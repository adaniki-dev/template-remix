export default function verifyArray<T>(value: T | T[]): T[] {
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
}

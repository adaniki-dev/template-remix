export default function isEmpty(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) {
    return true; // We treat non-objects or null as "empty"
  }
  return Object.keys(obj).length === 0;
}

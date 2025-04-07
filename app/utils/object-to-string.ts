export function ObjectsInString<T extends object>(object: T): string {
  if (!object) {
    return "";
  }
  let name = "";
  const keys = Object.keys(object) as Array<keyof T>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const keyAsString = String(key);
    if (object.hasOwnProperty(key)) {
      name += ` ${keyAsString}: ${object[key]}`;
      if (i !== keys.length - 1) {
        name += " /";
      }
    }
  }
  return name.trim();
}

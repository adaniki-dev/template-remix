export function jsonToObjectAndStringify(jsonString: string) {
  try {
    const jsonObject = JSON.parse(jsonString);

    const keysAndValues = Object.entries(jsonObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    return keysAndValues;
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return null;
  }
}

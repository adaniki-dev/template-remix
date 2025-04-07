"use client";
export const addSearchParamsInUrl = (key: string, value?: string) => {
  if (!value) {
    throw new Error("Value is required");
  }
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${searchParams.toString()}`,
  );
};

export function removeSearchParamsInURL(parameter: string) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(parameter);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${searchParams.toString()}`,
  );
}

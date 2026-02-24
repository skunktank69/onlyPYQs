export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://mocks-api.anispace.workers.dev";

export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, { ...init });
  if (!res.ok) {
    throw new Error(`Fetch failed (${res.status}) for ${url}`);
  }
  return (await res.json()) as T;
}

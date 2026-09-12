/*
This file is a small wrapper around `fetch()` that:
- makes requests
- throws a custom error when the response is not OK
- parses the JSON response as type `T`
*/

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  };
};

/* 
Centralizes common `fetch()` logic:
- one place for error handling
- one place for JSON parsing
- one place to add headers, auth, retries, logging, etc.
- cleaner call sites

example on how to use `const shows = await apiFetch<Show[]>("/api/shows");`
thats less code than repeating fetch, status checks, and json() everywhere.
*/
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
    );
  };

  return response.json() as Promise<T>;
}
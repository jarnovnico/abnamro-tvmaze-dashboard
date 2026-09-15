import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError, apiFetch } from './client';

// mock fetch() because we don't want to make real network requests in our tests
// if the tv maze api was down the tests would fail all the time even though are code might be valid

describe('api fetch client', () => {
  // this tests:
  // 1. fetch
  // 2. success reponse
  // 3. reponse.json()
  // 4. data returned

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed JSON for successful requests', async () => {
    // Vitest gives us `vi`
    // Temporarily replace/observe the real fetch function.
    const fetchMock = vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue(
          new Response(
            JSON.stringify({
              id: 1,
              name: 'Breaking Bad',
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              }
            }
          )
        );

    const result = await apiFetch<{ id: number, name: string }>('https://example.com/shows/1');

    expect(result).toEqual({
      id: 1,
      name: 'Breaking Bad',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/shows/1',
      {},
    );
  });

  // all 200's return json. all non 200's throw the `ApiError`
  it('throws ApiError when the response is not successful', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(null, { status: 404 })
      );

    const promise = apiFetch('https://example.com/missing');

    await expect(promise).rejects.toBeInstanceOf(ApiError);

    await expect(promise).rejects.toMatchObject({
      status: 404
    });
  });


  // ensuring our infrastructure tells the caller was as specifically a 429
  // useful later when we improve retry/backoff behavior
  it('preserves a 429 status code', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(null, { status: 429 })
      );

    await expect(apiFetch('https://example.com/shows')).rejects.toMatchObject({
      status: 429,
    });
  });
});
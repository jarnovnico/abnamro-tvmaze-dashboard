import { describe, expect, it } from 'vitest';

import { transformerRawDataTVMazeShow } from './tvmaze.transformer';

import type { RawTVMazeShow } from '../../src/api/tvmaze.types';

describe('transformerRawDataTVMazeShow', () => {
  // even if name -> title is only change we want to test if it fails immediately.
  it('transforms raw TVMaze show data into the application model', () => {
    const source: RawTVMazeShow = {
      id: 123,
      name: 'Breaking Bad',
      genres: [
        'Drama',
        'Crime',
      ],
      rating: {
        average: 9.5,
      },
      image: {
        medium: 'https://example.com/medium.jpg',
        original: 'https://example.com/original.jpg',
      },
      summary: '<p>A great show.</p>',
      premiered: '2008-01-20',
      status: 'Ended',
      language: 'English',
      runtime: 60,
      officialSite: 'https://example.com',
    };

    const result = transformerRawDataTVMazeShow(source);

    expect(result).toEqual({
      id: 123,
      title: 'Breaking Bad',
      genres: [
        'Drama',
        'Crime',
      ],
      rating: 9.5,
      image: {
        medium: 'https://example.com/medium.jpg',
        original: 'https://example.com/original.jpg',
      },
      summary: '<p>A great show.</p>',
      premiered: '2008-01-20',
      status: 'Ended',
      language: 'English',
      runtime: 60,
      officialSite: 'https://example.com',
    });
  });

  // also: the tvmaze api data can be incomplete!
  // ur UI can now assume `show.genre` is always an array
  it('uses safe defaults for missing optional fields', () => {
    const source: RawTVMazeShow = {
      id: 456,
      name: 'Incomplete Show',
    }

    const result = transformerRawDataTVMazeShow(source)

    expect(result).toEqual({
      id: 456,
      title: 'Incomplete Show',
      genres: [],
      rating: null,

      image: {
        medium: null,
        original: null,
      },

      summary: '',
      premiered: null,
      status: null,
      language: null,
      runtime: null,
      officialSite: null,
    });
  });
});
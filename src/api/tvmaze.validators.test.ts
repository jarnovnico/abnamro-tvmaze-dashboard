import { describe, expect, it } from 'vitest'

import { isTVMazeShow } from '../../src/api/tvmaze.validators'

describe('isTVMazeShow', () => {
  it('accepts a valid show object', () => {
    const value = {
      id: 1,
      name: 'Breaking Bad',
    };

    expect(isTVMazeShow(value)).toBe(true);
  });

  it('rejects null', () => {
    expect(isTVMazeShow(null)).toBe(false);
  });

  it('rejects an object without an id', () => {
    const value = {
      name: 'Breaking Bad',
    };

    expect(isTVMazeShow(value)).toBe(false);
  });

  it('rejects an object without a name', () => {
    const value = {
      id: 1,
    };

    expect(isTVMazeShow(value)).toBe(false);
  });

  // we want to test if our type guards are working correctly
  it('rejects an invalid id type', () => {
    const value = {
      id: '1',
      name: 'Breaking Bad'
    };
    expect(isTVMazeShow(value)).toBe(false);
  });
});
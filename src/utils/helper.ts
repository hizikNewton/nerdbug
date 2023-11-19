/* eslint-disable @typescript-eslint/no-explicit-any */
export const cls = (input: string) =>
  input
    .replace(/\s+/gm, ' ')
    .split(' ')
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim();

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || value instanceof String) {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  if (typeof value === 'number') {
    return value === 0;
  }

  return false;
};

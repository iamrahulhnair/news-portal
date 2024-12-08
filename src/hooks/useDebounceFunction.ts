import { useEffect } from 'react';

export const useDebounceFunction = <T>(
  fn: (value: T) => void,
  value: T,
  delay = 500
): void => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fn(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value]);
};

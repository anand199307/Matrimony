import {useState, useEffect} from 'react';

export const useDebounce = (value: string, milliseconds: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, milliseconds);

    return () => clearTimeout(timer);
  }, [milliseconds, value]);

  return debounceValue;
};

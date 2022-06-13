import { useState, useEffect } from 'react';

type UseLocalStorage = <T>(name: string, defaultValue: T) => [T, (newValue: T) => void];

const useLocalStorage: UseLocalStorage = (name, defaultValue) => {
  const [value, setValue] = useState(() => {
    const existingValue = localStorage.getItem(name);

    return existingValue ? JSON.parse(existingValue) as typeof defaultValue : defaultValue;
  });

  useEffect(() => {
    const stringifyValue = JSON.stringify(value);
    localStorage.setItem(name, stringifyValue);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;

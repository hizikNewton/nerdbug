import { useState } from 'react';

// Define a generic type for the data you want to store in local storage
type LocalStorageData<T> = {
  read: () => T | null;
  write: (value: T) => void;
  value:T
};

// Define the useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue?: T): LocalStorageData<T> {
  // Try to retrieve data from local storage, use initialValue if not found
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // State to hold the current value
  const [value, setValue] = useState<T>(initial);

  // Function to read data from local storage
  const read = (): T | null => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return null;
    }
  };

  // Function to write data to local storage
  const write = (newValue: T): void => {
    try {
      // Update the state and local storage
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error writing to local storage:', error);
    }
  };

  return { read, write,value };
}

export default useLocalStorage;

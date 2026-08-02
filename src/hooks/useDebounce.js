import { useEffect, useState } from 'react';

// Debounces a fast-changing value; used for the Dictionary/Recommend
// search input so we don't hit the backend on every keystroke.
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

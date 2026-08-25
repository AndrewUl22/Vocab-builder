import { useEffect, useRef } from 'react';

/**
 * Calls `callback` with the latest `value` after `delay` ms of inactivity.
 * Used for the Filters search input (300ms per the ТЗ).
 */
export function useDebouncedEffect(value, callback, delay = 300) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(value), delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);
}

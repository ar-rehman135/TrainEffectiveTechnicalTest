import { useMemo, useState } from "react";

/**
 * Debounce a function by time
 * @param {Function} func
 * @param {Number} delay
 */

const useDebounce = (func: (...args: any[]) => any, delay: number) => {
  const [id, setId] = useState<NodeJS.Timeout>(null);

  return useMemo(
    (...args) => {
      if (id) {
        clearTimeout(id);
      } else {
        setId(
          setTimeout(() => {
            setId(null);
            func(...args);
          }, delay)
        );
      }
    },
    [func]
  );
};

export default useDebounce;

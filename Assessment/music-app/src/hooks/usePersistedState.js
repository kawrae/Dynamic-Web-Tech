import { useEffect, useState } from "react";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.log(`Failed to parse localStorage key "${key}":`, error);
      }
    }

    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
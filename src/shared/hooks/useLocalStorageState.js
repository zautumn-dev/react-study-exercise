import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, localKey) {
  const [val, setVal] = useState(function () {
    if (!localKey) return initialState;

    const localVal = localStorage.getItem(localKey);

    if (!localVal) return initialState;

    return JSON.parse(localVal);
  });

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(val));
  }, [localKey, val]);

  return [val, setVal];
}

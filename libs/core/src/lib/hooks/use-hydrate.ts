import { useCallback, useState } from 'react';

type Callback = () => void;

export const useHydrate = (): Callback => {
  const { 1: reactHydrate } = useState(false);
  const hydrate = useCallback((): void => reactHydrate((st) => !st), []);
  return hydrate;
};

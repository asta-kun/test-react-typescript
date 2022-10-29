import { useEffect, useRef, useCallback } from 'react';

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    return () => {
      isFirstRender.current = false;
    };
  });

  return useCallback(() => {
    return isFirstRender.current;
  }, []);
};

import { useEffect, useRef, useCallback } from 'react';

export const useIsMounted = (): (() => boolean) => {
  const isMounted = useRef<boolean>(true);

  const checkStatus = useCallback(() => {
    return isMounted.current;
  }, []);

  useEffect(() => {
    isMounted.current = true; // fast render (dev)
    return () => {
      isMounted.current = false;
    };
  }, []);

  return checkStatus;
};

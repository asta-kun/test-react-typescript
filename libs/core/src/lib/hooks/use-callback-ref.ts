import { isFunction } from 'lodash';
import { useCallback, useRef } from 'react';

export const useCallbackRef = <T>(callback: T): T => {
  const ref = useRef<typeof callback>();
  ref.current = callback;

  const forwardedRef = useCallback((...args: unknown[]) => {
    if (isFunction(ref.current)) return ref.current(...args);
  }, []) as unknown as T;

  return forwardedRef;
};

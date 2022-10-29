import { isNil } from 'lodash';
import { DateTime } from 'luxon';
import { useRef, useMemo, isValidElement } from 'react';

//  preserve the original object refs deeply
const preserveOldValues = <T>(prev: T, next: T): T => {
  // string/objectRef/number/boolean support
  if (prev === next) return prev;

  // react bypass
  if (isValidElement(next)) return next;

  if (isNil(prev) && !isNil(next)) return next;

  // moment support
  if (DateTime.isDateTime(prev) && DateTime.isDateTime(next))
    return prev.equals(next) ? prev : next;

  // array support
  if (Array.isArray(prev) && Array.isArray(next)) {
    let contentIsEqual = true;
    if (prev.length !== next.length) contentIsEqual = false; // return the new value if the lengths are different

    const nextArray = next.map((item, index) => {
      const prevItem = prev[index];
      const nextItem = preserveOldValues(prevItem, item);

      // helpful to know if the content is the same to return the complete objectRef
      if (nextItem !== prevItem) contentIsEqual = false;
      return nextItem;
    }) as unknown as T;

    if (contentIsEqual) return prev; // return the previous value if the content is the same

    return nextArray;
  }

  // object support
  if (typeof prev === 'object' && typeof next === 'object') {
    if (prev === null || next === null) return next; // return the new value if either is null
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);

    let contentIsEqual = true;

    if (prevKeys.length !== nextKeys.length) contentIsEqual = false; // return the new value if the lengths are different

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextObject = nextKeys.reduce((acc: Record<string, any>, key) => {
      // try to preserve the old value if it exists
      const itemResult = preserveOldValues(
        (prev as Record<string, unknown>)[key],
        (next as Record<string, unknown>)[key]
      );
      const isTheSame = itemResult === (prev as Record<string, unknown>)[key];

      // helpful to know if the content is the same to return the complete objectRef
      if (!isTheSame) contentIsEqual = false;

      acc[key] = itemResult;
      return acc;
    }, {} as T);

    if (contentIsEqual) return prev; // return the previous value if the content is the same

    return nextObject as T;
  }

  // next as default
  return next;
};

export const useDynamicChanges = <T>(
  factory: () => T,
  dependencies: unknown[]
): T => {
  const lastChanges = useMemo(factory, dependencies);
  const previousCachedValue = useRef<T>(lastChanges);

  previousCachedValue.current = useMemo(() => {
    return preserveOldValues(previousCachedValue.current, lastChanges);
  }, [lastChanges]);

  return previousCachedValue.current;
};

import BetterLock from 'better-lock';

/* IndexedDB only supports one transaction at the same time, 
   a queue is important to prevent issues. */

const key = 'indexedDBQueue';

export const indexedDBLock = new BetterLock({
  name: key,
});

const indexedDBQueue = <T>(callback: () => Promise<T> | T): Promise<T> =>
  indexedDBLock.acquire(key, () => Promise.resolve(callback()));

export default indexedDBQueue;

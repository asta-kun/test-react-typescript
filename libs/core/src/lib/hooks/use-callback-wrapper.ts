import { useCallbackRef } from './use-callback-ref';

interface Props {
  onStarts: () => void;
  onEnds: () => void;
}

type Response = <T>(callback: (...args: unknown[]) => T) => () => T;

export const useCallbackWrapper = ({ onStarts, onEnds }: Props): Response => {
  const helper = useCallbackRef(<T>(callback: (...args: unknown[]) => T) => {
    const fn = (...args: unknown[]) => {
      onStarts();

      let response: T;
      let promise = false;

      try {
        response = callback(...args);

        if (response && 'then' in response) {
          promise = true;
          (response as unknown as Promise<T>).finally(onEnds);
        }
      } finally {
        if (promise === false) onEnds();
      }

      return response;
    };

    return fn;
  });

  return helper;
};

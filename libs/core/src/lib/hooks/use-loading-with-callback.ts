import { useState } from 'react';
import { useCallbackWrapper } from './use-callback-wrapper';
import { useIsMounted } from './use-is-mounted';

// Track loading state

type Response = [boolean, <T>(callback: (...args: unknown[]) => T) => () => T];

export const useLoadingWithCallback = (): Response => {
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onStarts = () => {
    if (isMounted()) setIsLoading(true);
  };

  const onEnds = () => {
    if (isMounted()) setIsLoading(false);
  };

  const helper = useCallbackWrapper({ onStarts, onEnds });

  return [isLoading, helper];
};

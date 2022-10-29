import React, { ReactElement, ReactNode, useEffect, useState } from 'react';

interface PassiveUnmountProps {
  children: ReactNode;
  mounted: boolean;
  keepMounted?: boolean;
  tolerance?: number;
}
export const PassiveUnmount = ({
  keepMounted = false,
  children,
  mounted,
  tolerance = 500,
}: PassiveUnmountProps): ReactElement | null => {
  const [isMounted, setIsMounted] = useState<boolean>(mounted);

  useEffect(() => {
    // bypass
    if (keepMounted && !isMounted) {
      setIsMounted(true);
      return;
    }

    // mounted via parent
    if (mounted && !isMounted) {
      setIsMounted(true);
      return;
    }

    // schedule unmount
    if (!mounted && isMounted) {
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, tolerance);

      return (): void => {
        clearTimeout(timeout);
      };
    }
  }, [keepMounted, mounted, tolerance]);

  if (!isMounted) return null;
  return <>{children}</>;
};

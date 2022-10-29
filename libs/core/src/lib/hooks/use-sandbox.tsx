import { useDynamicPortals } from '../decorators/withDynamicPortals';
import { useCallbackRef } from '.';
import { ComponentProps, useRef } from 'react';
import { Box, BoxTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { isFunction } from 'lodash';

interface Props {
  renderIn?: HTMLElement;
  onReady?: (element: Window) => void;
  iframeProps?: Omit<
    ComponentProps<OverridableComponent<BoxTypeMap<unknown, 'iframe'>>>,
    'component' | 'ref'
  >;
  decorators?: ((element: Window) => void | (() => void))[];
}

export const useSandbox = ({
  renderIn,
  onReady,
  iframeProps = {},
  decorators = [],
}: Props): void => {
  const sandbox = useRef<HTMLIFrameElement>(null);
  const cleanUp = useRef<(() => void)[]>([]);

  const onMount = useCallbackRef(() => {
    if (!sandbox.current)
      throw new Error('Sandbox is not mounted, this can be a misconfiguration');

    // iframe is available
    if (onReady) {
      const window = (sandbox.current as HTMLIFrameElement)
        .contentWindow as Window;

      onReady(window);

      decorators.forEach((decorator) => {
        const decoratorCleanUp = decorator(window);
        if (isFunction(decoratorCleanUp))
          cleanUp.current.push(decoratorCleanUp);
      });
    }
  });

  const onUnmount = useCallbackRef(() => {
    cleanUp.current.forEach((cleanUpFn) => cleanUpFn());
    cleanUp.current = [];
  });

  useDynamicPortals(
    true,
    Box as OverridableComponent<BoxTypeMap<unknown, 'iframe'>>,
    {
      sandbox: 'allow-same-origin',
      ...iframeProps,
      component: 'iframe',
      ref: sandbox,
    },
    {
      parent: renderIn,
      onMount,
      onUnmount,
    }
  );
};

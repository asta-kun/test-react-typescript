import { useHydrate } from './use-hydrate';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const DEFAULT_TIMEOUT = 400;

const useStyles = makeStyles({
  '@keyframes shakeE': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '20%': {
      transform: 'translate(-2px, -2px)',
    },
    '40%': {
      transform: 'translate(2px, 2px)',
    },
    '60%': {
      transform: 'translate(-2px, -2px)',
    },
    '80%': {
      transform: 'translate(2px, 2px)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
  shake: {
    animation: `$shakeE ${DEFAULT_TIMEOUT}ms ease-in-out`,
  },
});

type Response<T> = [
  (key: T | '*') => void,
  (key: T, node: ReactElement) => ReactElement
];

export const useShake = <T extends string>(): Response<T> => {
  const classes = useStyles();
  const hydrate = useHydrate();
  const shaking = useRef({} as Record<T, NodeJS.Timeout>);

  const shake = useCallback(
    (key: T | '*'): void => {
      if (!key) throw new Error('Key is required.');

      const keys = (key === '*' ? Object.keys(shaking.current) : [key]) as T[];

      keys.forEach((key) => {
        // cancel current if it's shaking
        if (shaking.current[key]) clearTimeout(shaking.current[key]);

        // start shaking
        shaking.current[key] = setTimeout(() => {
          delete shaking.current[key];
          hydrate();
        }, DEFAULT_TIMEOUT);
      });

      // apply
      hydrate();
    },
    [shaking.current]
  );

  const wrapper = useCallback(
    (key: T, node: ReactElement): ReactElement => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentProps = (node as any)?.props;

      // no supported node
      if (!currentProps) return node;

      // inject shake class
      return cloneElement(node as ReactElement, {
        ...currentProps,
        className: clsx(currentProps?.className, {
          [classes.shake]: key in shaking.current,
        }),
      });
    },
    [shaking.current]
  );

  // cancel shaking lifecycle
  useEffect(
    () =>
      function cleaning() {
        (Object.values(shaking.current) as NodeJS.Timeout[]).forEach(
          (timeout): void => {
            clearTimeout(timeout);
          }
        );
      },
    []
  );

  return [shake, wrapper];
};

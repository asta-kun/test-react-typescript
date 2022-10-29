import {
  useDynamicChanges,
  useHydrate,
  useIsomorphicLayoutEffect,
} from '../hooks';
import { v4 as uuid } from 'uuid';
import React, {
  ComponentProps,
  ComponentType,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const ALREADY_INITIALIZED_MSG =
  'The feature is already initialized, double implementation is not allowed.';

const NOT_INITIALIZED_MSG =
  'The feature has not been initialized yet, please check the decorator "withDynamicPortals".';
const MEMORY_LEAK_MSG =
  'The feature is not initialized or it has been unmounted, This is a memory leak.';

const state = {
  isConnected: false,
};

interface Actions<T> {
  mount: (
    Component: ComponentType<T>,
    props: ComponentProps<ComponentType<T>>,
    options?: {
      parent?: HTMLElement;
      hidden?: boolean;
      onMount?: () => void;
      onUnmount?: () => void;
    }
  ) => string;
  update: (
    key: string,
    props: ComponentProps<ComponentType<T>>,
    options?: {
      parent?: HTMLElement;
      hidden?: boolean;
    }
  ) => void;
  unmount: (key: string) => void;
}

const defaultNotInitializedCallback = (): string => {
  throw new Error(NOT_INITIALIZED_MSG);
};

const defaultUpdateCallback = (): void => {
  throw new Error(MEMORY_LEAK_MSG);
};

const defaultUnmountCallback = (): void => {
  // on decorator unmounting, all children are unmounted automatically
  // it's safe to do nothing here
};

// on the decorator's unmount, these values must be reset
export const actions: Actions<unknown> = {
  mount: defaultNotInitializedCallback,
  update: defaultUpdateCallback,
  unmount: defaultUnmountCallback,
};

interface IndexedPortal<T> {
  Component: ComponentType<T>;
  props: ComponentProps<ComponentType<T>>;
  options: {
    parent: HTMLElement;
    hidden?: boolean;
    onMount?: () => void;
    onUnmount?: () => void;
  };
}

type IndexedPortalDictionary = Record<string, IndexedPortal<unknown>>;

interface PortalInstanceProps {
  onMount?: () => void;
  onUnmount?: () => void;
  children: ReactNode;
}
const PortalInstance = ({
  onMount,
  onUnmount,
  children,
}: PortalInstanceProps) => {
  // children is not mounted when useEffect is called, rehydrate it manually can handle this
  const [mounted, setMounted] = useState(false);

  useEffect(
    function lifeCycle() {
      if (!mounted) return; // do nothing
      if (onMount) onMount();
      return () => {
        if (onUnmount) onUnmount();
      };
    },
    [mounted]
  );

  useEffect(function rehydrate() {
    setMounted(true);
  }, []);

  return <Fragment>{children}</Fragment>;
};

// manage multiple portals (based on subscriptions)
export function withDynamicPortals<T>(
  Component: ComponentType<T>
): ComponentType<T> {
  return function DynamicPortalsDecorator(props) {
    const indexedPortals = useRef<IndexedPortalDictionary>({});
    const hydrate = useHydrate();
    const [ready, setReady] = useState(false);

    useIsomorphicLayoutEffect(function Initializing() {
      if (ready) return; // do nothing

      // on mounting
      if (state.isConnected) throw new Error(ALREADY_INITIALIZED_MSG);

      // initialize the state
      state.isConnected = true;
      actions.mount = ((
        Component,
        props,
        { parent = document.body, hidden = false, onMount, onUnmount } = {}
      ) => {
        const portalId = uuid();
        indexedPortals.current[portalId] = {
          Component,
          props,
          options: { parent, hidden, onMount, onUnmount },
        };
        hydrate();
        return portalId;
      }) as Actions<unknown>['mount'];

      actions.update = ((portalId: string, props = {}, options = {}): void => {
        indexedPortals.current[portalId] = {
          ...indexedPortals.current[portalId],
          props: {
            ...(indexedPortals.current[portalId].props as Pick<
              IndexedPortal<unknown>,
              'props'
            >),
            ...(props as Pick<IndexedPortal<unknown>, 'props'>),
          },
          options: { ...indexedPortals.current[portalId].options, ...options },
        } as IndexedPortal<unknown>;
        hydrate();
      }) as Actions<unknown>['update'];

      actions.unmount = (portalId: string): void => {
        if (!(portalId in indexedPortals.current))
          throw new Error(MEMORY_LEAK_MSG);
        delete indexedPortals.current[portalId];
        hydrate();
      };
      setReady(true);
      return function Resetting() {
        state.isConnected = false;
        actions.mount = defaultNotInitializedCallback;
        actions.update = defaultUpdateCallback;
        actions.unmount = defaultUnmountCallback;
      };
    }, []);

    if (!ready) return null;

    return (
      <>
        <Component {...props} />
        {Object.entries(indexedPortals.current).map(([portalId, args]) => {
          const { props, options } = args;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Component = args.Component as any;

          const Wrapper = options.hidden ? Hidden : Fragment;

          return (
            <PortalInstance
              key={portalId}
              onMount={options.onMount}
              onUnmount={options.onUnmount}
            >
              {options.parent &&
                createPortal(
                  <Wrapper>
                    <Component {...props} />
                  </Wrapper>,
                  options.parent
                )}
            </PortalInstance>
          );
        })}
      </>
    );
  };
}

interface DynamicPortalsDecoratorProps {
  mount(): void;
  unmount(): void;
}

export const useDynamicPortals = <T,>(
  defaultMounted: boolean,
  Component: ComponentType<T>,
  props: ComponentProps<ComponentType<T>>,
  options?: {
    hidden?: boolean;
    parent?: HTMLElement;
    onMount?: () => void;
    onUnmount?: () => void;
  }
): DynamicPortalsDecoratorProps => {
  const [mounted, setMounted] = useState(defaultMounted);
  const portalId = useRef<string | null>(null);

  const mount = useCallback(() => {
    setMounted(true);
  }, []);

  const unmount = useCallback(() => {
    setMounted(false);
  }, []);

  const deps = useDynamicChanges(() => [props, options], [props, options]);
  useIsomorphicLayoutEffect(function updatingComponent() {
    if (!mounted || !portalId.current) return; // do nothing if the portal is not displayed
    actions.update(portalId.current, props, options);
  }, deps);

  useIsomorphicLayoutEffect(
    function MountingPortal() {
      if (!mounted) return; // do nothing if the portal is not displayed

      // mounting component
      const currentId = actions.mount(
        Component as ComponentType<unknown>,
        props,
        {
          parent: document.body,
          ...options,
        }
      );
      portalId.current = currentId;

      return function UnmountingPortal() {
        // unmounting component
        actions.unmount(currentId);
        portalId.current = null;
      };
    },
    [mounted]
  );

  return { mount, unmount };
};

function Hidden({ children }: { children: ReactNode }) {
  return <div style={{ display: 'none' }}>{children}</div>;
}

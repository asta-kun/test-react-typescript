import { useMemo, MouseEvent, useCallback } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
import { useCallbackWrapper } from '@factumex/core/hooks';

const stuckNavigation = atom(false);

const BASE_PATH = '';

export enum Page {
  main,
  login,
  employees,
  upload,
}

enum URLType {
  backHistory,
}

type URL = string | URLType;
export interface PageMap {
  back: URL;
  main: URL;
  login: URL;
  employees: URL;
}

interface Response {
  withEvents: Record<keyof PageMap, () => void>;
  pages: PageMap;
  disabled: boolean;
  busy: <T>(callback: (...args: unknown[]) => T) => () => T;
  buildAbsoluteURL: (relativePath: URL) => string;
}

const useNavigation = (context: Page): Response => {
  const router = useRouter();
  const [disabled, setDisabled] = useAtom(stuckNavigation);
  const busy = useCallbackWrapper({
    onStarts: () => setDisabled(true),
    onEnds: () => setDisabled(false),
  });

  const path = ((): string => {
    // default
    return BASE_PATH;
  })();

  const main = path + '/';
  const login = `${path}/login`;
  const employees = `${path}/employees`;

  const buildAbsoluteURL = useCallback((relativePath: URL): string => {
    return `${window.location.origin}${relativePath}`;
  }, []);

  const pages: Record<keyof PageMap, URL> = useMemo(() => {
    const obj = ((): Record<string, URL> => {
      switch (context) {
        case Page.main:
        default:
          return {
            main,
            login,
            employees,
            back: main,
          };
      }
    })();

    return obj;

    // default
  }, [main, login, employees]);

  const withEvents: Record<string, (e?: MouseEvent<HTMLElement>) => void> =
    useMemo(() => {
      return withRoute(router, pages);

      // default
    }, [pages]);

  return { withEvents, pages, disabled, busy, buildAbsoluteURL };
};

export default useNavigation;

function withRoute(
  route: NextRouter,
  obj: Record<string, URL>
): Record<string, () => void> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = (e?: MouseEvent<HTMLElement>): void => {
      if (e?.preventDefault) e.preventDefault();

      // standard url
      if (typeof value === 'string') {
        route.push(value);
        return;
      }

      // with enum
      switch (value) {
        case URLType.backHistory:
          route.back();
          break;
        default:
          throw new Error('unknown url type');
      }
    };
    return acc;
  }, {} as Record<string, () => void>);
}

import { useMemo, useState, useCallback, useEffect } from 'react';

interface Props<T> {
  items: T[];
  pageSize: number;
  defaultPage: number;
  resetOnItemsChange?: boolean;
}

interface Response<T> {
  results: T[];
  next: () => void;
  previous: () => void;
  pages: number;
  setPage: (page: number) => void;
}

const usePagination = <T>({
  items,
  pageSize,
  defaultPage = 1,
  resetOnItemsChange = true,
}: Props<T>): Response<T> => {
  const [page, setPage] = useState(defaultPage);

  const pages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items, pageSize]
  );

  const results = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, page, pageSize]);

  const next = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const previous = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  // Reset page to defaultPage when items change
  useEffect(() => {
    if (resetOnItemsChange && page !== defaultPage) {
      setPage(defaultPage);
    }
  }, [items.length]);

  return { results, next, previous, pages, setPage };
};

export default usePagination;

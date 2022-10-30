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
  page: number;
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
    setPage((prev) => {
      const nextPage = prev + 1;
      return nextPage > pages ? 1 : nextPage;
    });
  }, []);

  const previous = useCallback(() => {
    setPage((prev) => {
      const previousPage = prev - 1;
      return previousPage < 1 ? pages : previousPage;
    });
  }, []);

  // Reset page to defaultPage when items change
  useEffect(() => {
    if (resetOnItemsChange && page !== defaultPage) {
      setPage(defaultPage);
    }
  }, [items.length]);

  return { results, next, previous, pages, setPage, page };
};

export default usePagination;

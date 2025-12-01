import { useCallback, useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps<T> {
  fetchData: (page: number, limit: number) => Promise<T[]>;
  onLoad: (items: T[]) => void;
  limit?: number;
  containerId?: string;
}

function InfiniteScroll<T>({
  fetchData,
  onLoad,
  limit = 9,
  containerId,
}: Readonly<InfiniteScrollProps<T>>) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const currentPageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    currentPageRef.current = page;
  }, [page]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const loadData = useCallback(
    async (pageToLoad: number) => {
      if (loadingRef.current || !hasMoreRef.current) {
        return;
      }
      setLoading(true);
      try {
        const newItems = await fetchData(pageToLoad, limit);
        setHasMore(newItems.length === limit);
        onLoad(newItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData, limit, onLoad]
  );

  useEffect(() => {
    if (isInitialFetch) {
      loadData(1);
      setIsInitialFetch(false);
    }
  }, [loadData, isInitialFetch]);

  useEffect(() => {
    if (!containerId) {
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = container;

      if (
        scrollTop + clientHeight + 1 >= scrollHeight &&
        !loadingRef.current &&
        hasMoreRef.current
      ) {
        const nextPage = currentPageRef.current + 1;
        setPage(nextPage);
        loadData(nextPage);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerId, loadData]);

  return null;
}

export default InfiniteScroll;

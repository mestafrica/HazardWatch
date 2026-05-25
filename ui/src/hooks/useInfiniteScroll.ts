import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  threshold?: number;
  enabled?: boolean;
}

export const useInfiniteScroll = ({
  onLoadMore,
  threshold = 0.1,
  enabled = true,
}: UseInfiniteScrollOptions): React.RefObject<HTMLDivElement> => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold },
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, threshold, enabled]);

  return observerTarget;
};

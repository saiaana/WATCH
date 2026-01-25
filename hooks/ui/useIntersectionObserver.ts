import { useEffect, useRef, useCallback, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce && !hasTriggered) {
          setHasTriggered(true);
        }
      } else if (!triggerOnce) {
        setIsIntersecting(false);
      }
    },
    [triggerOnce, hasTriggered],
  );

  const setElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      elementRef.current = node;

      if (node) {
        const options = {
          root: null,
          rootMargin,
          threshold,
        };

        observerRef.current = new IntersectionObserver(handleObserver, options);
        observerRef.current.observe(node);
      }
    },
    [handleObserver, rootMargin, threshold],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    elementRef: setElementRef,
    isIntersecting,
    hasTriggered,
  };
}

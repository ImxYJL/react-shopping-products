import { useEffect, useRef } from "react";

interface UseIntersectionObserver<T> {
  setTarget: (target: T) => void;
}

const useIntersectionObserver = <T extends Element>(
  callback: IntersectionObserverCallback
): UseIntersectionObserver<T> => {
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(callback);
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, targetRef]);

  return { setTarget: (target: T) => (targetRef.current = target) };
};

export default useIntersectionObserver;

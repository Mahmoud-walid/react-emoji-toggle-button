import { useCallback, useEffect, useRef } from "react";

const useHorizontalSmoothScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const speed = 0.1;

  const smoothScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (Math.abs(currentScrollRef.current - targetScrollRef.current) > 1) {
      currentScrollRef.current +=
        (targetScrollRef.current - currentScrollRef.current) * speed;
      container.scrollLeft = currentScrollRef.current;

      requestAnimationFrame(smoothScroll);
    } else {
      isScrollingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      targetScrollRef.current += e.deltaY;

      const maxScroll = container.scrollWidth - container.clientWidth;

      targetScrollRef.current = Math.min(
        Math.max(targetScrollRef.current, 0),
        maxScroll
      );

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        smoothScroll();
      }
    };

    container.addEventListener("wheel", onWheel);

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [smoothScroll]);

  return { containerRef };
};

export default useHorizontalSmoothScroll;

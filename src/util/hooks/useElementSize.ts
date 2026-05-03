import { RefObject, useEffect, useRef, useState } from "react";

export interface ElementSize {
  height: number;
  width: number;
}

export function useElementSize<TElement extends HTMLElement>(): [
  elementRef: RefObject<TElement>,
  size: ElementSize,
] {
  const elementRef = useRef<TElement>(null);
  const [size, setSize] = useState<ElementSize>({ height: 0, width: 0 });

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setSize({
        height: rect.height,
        width: rect.width,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [elementRef, size];
}

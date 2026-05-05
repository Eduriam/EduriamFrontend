import { MutableRefObject, useRef } from "react";

// Source: https://stackoverflow.com/a/57135211/13082130
export function useScroll(): [
  executeScroll: () => void,
  elRef: MutableRefObject<HTMLElement | null>,
] {
  const elRef = useRef<null | HTMLElement>(null);
  function executeScroll() {
    elRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return [executeScroll, elRef];
}

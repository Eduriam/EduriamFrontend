import { MutableRefObject, useRef } from "react";

export function useFocus(): [
  htmlElRef: MutableRefObject<HTMLInputElement | undefined>,
  setFocus: () => void,
] {
  const htmlElRef = useRef<HTMLInputElement>();
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
}

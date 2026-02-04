"use client";

import theme from "styles/theme";

import { useCallback } from "react";

import { useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

import useMediaQuery from "@mui/material/useMediaQuery";

type TransitionDirection = "forward" | "back";

export type TransitionNavigationOptions = {
  direction?: TransitionDirection;
};

const useTransitionNavigationHandler = () => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const transitionRouter = useTransitionRouter();
  const setTransitionDirection = useCallback(
    (direction: TransitionDirection) => {
      document.documentElement.dataset.transitionDirection = direction;
    },
    [],
  );

  const push = useCallback(
    (path: string) => {
      if (mobile) {
        setTransitionDirection("forward");
        transitionRouter.push(path);
        return;
      }

      router.push(path);
    },
    [mobile, router, setTransitionDirection, transitionRouter],
  );

  const back = useCallback(
    (path: string) => {
      if (mobile) {
        setTransitionDirection("back");
        transitionRouter.push(path);
        return;
      }

      router.push(path);
    },
    [mobile, router, setTransitionDirection, transitionRouter],
  );

  return useCallback(
    (path: string, options?: TransitionNavigationOptions) => () => {
      if (options?.direction === "back") {
        back(path);
        return;
      }

      push(path);
    },
    [back, push],
  );
};

export default useTransitionNavigationHandler;

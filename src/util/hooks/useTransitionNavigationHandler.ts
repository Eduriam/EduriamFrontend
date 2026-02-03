"use client";

import theme from "styles/theme";

import { useCallback } from "react";

import { useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

import useMediaQuery from "@mui/material/useMediaQuery";

type TransitionDirection = "forward" | "back";

export type TransitionNavigationOptions = {
  direction?: TransitionDirection;
  replace?: boolean;
};

const useTransitionNavigationHandler = () => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const transitionRouter = useTransitionRouter();

  const push = useCallback(
    (path: string) => {
      if (mobile) {
        document.documentElement.dataset.transitionDirection = "forward";
        transitionRouter.push(path);
        return;
      }

      router.push(path);
    },
    [mobile, router, transitionRouter],
  );

  const replace = useCallback(
    (path: string) => {
      if (mobile) {
        document.documentElement.dataset.transitionDirection = "forward";
        transitionRouter.replace(path);
        return;
      }

      router.replace(path);
    },
    [mobile, router, transitionRouter],
  );

  const back = useCallback(() => {
    if (mobile) {
      document.documentElement.dataset.transitionDirection = "back";
      transitionRouter.back();
      return;
    }

    router.back();
  }, [mobile, router, transitionRouter]);

  return useCallback(
    (path: string, options?: TransitionNavigationOptions) => () => {
      if (options?.direction === "back") {
        back();
        return;
      }

      if (options?.replace) {
        replace(path);
        return;
      }

      push(path);
    },
    [back, push, replace],
  );
};

export default useTransitionNavigationHandler;

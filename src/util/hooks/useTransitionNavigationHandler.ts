"use client";

import theme from "styles/theme";

import { useCallback } from "react";

import { useTransitionRouter } from "next-view-transitions";
import { useRouter } from "next/navigation";

import useMediaQuery from "@mui/material/useMediaQuery";

import { UserRole } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";

import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";

type TransitionDirection = "forward" | "back";

export type TransitionNavigationOptions = {
  direction?: TransitionDirection;
};

const useTransitionNavigationHandler = () => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const transitionRouter = useTransitionRouter();
  const { user } = useAuth();

  const setTransitionDirection = useCallback(
    (direction: TransitionDirection) => {
      document.documentElement.dataset.transitionDirection = direction;
    },
    [],
  );

  const resolveNavigationPath = useCallback(
    (path: string): string => {
      const isStudyOrReviewPath =
        /^\/study($|[/?])/.test(path) || /^\/review($|[/?])/.test(path);
      const isPremiumUser = user?.role === UserRole.PremiumUser;
      const hasNoEnergy = (user?.energy ?? 0) <= 0;

      if (user && isStudyOrReviewPath && !isPremiumUser && hasNoEnergy) {
        return getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft);
      }

      return path;
    },
    [user],
  );

  const push = useCallback(
    (path: string) => {
      const resolvedPath = resolveNavigationPath(path);

      if (mobile) {
        setTransitionDirection("forward");
        transitionRouter.push(resolvedPath);
        return;
      }

      router.push(resolvedPath);
    },
    [
      mobile,
      resolveNavigationPath,
      router,
      setTransitionDirection,
      transitionRouter,
    ],
  );

  const back = useCallback(
    (path: string) => {
      const resolvedPath = resolveNavigationPath(path);

      if (mobile) {
        setTransitionDirection("back");
        transitionRouter.push(resolvedPath);
        return;
      }

      router.push(resolvedPath);
    },
    [
      mobile,
      resolveNavigationPath,
      router,
      setTransitionDirection,
      transitionRouter,
    ],
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
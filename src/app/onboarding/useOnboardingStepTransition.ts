"use client";

import { useCallback, useEffect, useState } from "react";

export type TransitionDirection = "forward" | "back";

const TRANSITION_DURATION_MS = 300;

export type OnboardingStepTransitionOptions = {
  /** When leaving "recommended-courses", was showAllCourses true or false (so we render the correct leaving view). */
  leavingShowAllCourses?: boolean;
};

/**
 * Returns a function to change step and transition state.
 * When transitioning: sets leavingStep so the page can render both the outgoing
 * step (slide-out) and the new step (slide-in), matching globals.css page navigation.
 * Clears leavingStep after the animation duration.
 */
export const useOnboardingStepTransition = <TStep extends string>() => {
  const [transitionDirection, setTransitionDirection] =
    useState<TransitionDirection>("forward");
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [leavingStep, setLeavingStep] = useState<TStep | null>(null);
  const [leavingShowAllCourses, setLeavingShowAllCourses] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (leavingStep === null) return;
    const t = setTimeout(() => {
      setLeavingStep(null);
      setLeavingShowAllCourses(null);
    }, TRANSITION_DURATION_MS);
    return () => clearTimeout(t);
  }, [leavingStep]);

  const transitionStep = useCallback(
    (
      update: () => void,
      direction: TransitionDirection,
      currentStep: TStep,
      options?: OnboardingStepTransitionOptions,
    ) => {
      setHasTransitioned(true);
      setLeavingStep(currentStep);
      setLeavingShowAllCourses(
        options?.leavingShowAllCourses ?? null,
      );
      setTransitionDirection(direction);
      update();
    },
    [],
  );

  return {
    transitionStep,
    transitionDirection,
    hasTransitioned,
    leavingStep,
    leavingShowAllCourses,
    transitionDurationMs: TRANSITION_DURATION_MS,
  };
};

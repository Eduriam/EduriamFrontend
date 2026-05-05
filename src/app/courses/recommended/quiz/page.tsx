"use client";

import { PageRoot, ProgressNavbar } from "@eduriam/ui-core";
import AreaOfInterestStep from "app/courses/recommended/quiz/components/AreaOfInterestStep";
import CodingExperienceStep from "app/courses/recommended/quiz/components/CodingExperienceStep";
import UserGoalStep from "app/courses/recommended/quiz/components/UserGoalStep";
import { useOnboardingStepTransition } from "app/onboarding/useOnboardingStepTransition";
import theme from "styles/theme";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useState } from "react";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import type {
  ProductAreaOfInterest,
  ProductCodingExperience,
  ProductUserGoal,
} from "infrastructure/api/generated/models";
import { SettingsService } from "infrastructure/services/users/SettingsService";

import QuizFinishedStep from "./components/QuizFinishedStep";

type QuizStep =
  | "coding-experience"
  | "area-of-interest"
  | "user-goal"
  | "quiz-finished";

const QUIZ_STEPS: QuizStep[] = [
  "coding-experience",
  "area-of-interest",
  "user-goal",
  "quiz-finished",
];

const RecommendationQuizPage: React.FC = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  const [step, setStep] = useState<QuizStep>("coding-experience");
  const [codingExperience, setCodingExperience] =
    useState<ProductCodingExperience | null>(null);
  const [areaOfInterest, setAreaOfInterest] =
    useState<ProductAreaOfInterest | null>(null);
  const [userGoal, setUserGoal] = useState<ProductUserGoal | null>(null);

  const currentStepIndex = QUIZ_STEPS.indexOf(step);
  const showBack = currentStepIndex > 0;
  const progressValue =
    QUIZ_STEPS.length > 1
      ? Math.round((currentStepIndex / (QUIZ_STEPS.length - 1)) * 100)
      : 0;

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { transitionStep, transitionDirection, hasTransitioned, leavingStep } =
    useOnboardingStepTransition<QuizStep>();

  const handleBack = () => {
    if (currentStepIndex > 0) {
      transitionStep(
        () => setStep(QUIZ_STEPS[currentStepIndex - 1]),
        "back",
        step,
      );
    }
  };

  const handleContinue = async () => {
    if (step === "coding-experience" && codingExperience !== null) {
      transitionStep(() => setStep("area-of-interest"), "forward", step);
    } else if (step === "area-of-interest" && areaOfInterest !== null) {
      transitionStep(() => setStep("user-goal"), "forward", step);
    } else if (step === "user-goal" && userGoal !== null) {
      try {
        await SettingsService.updateSettings({
          productPreferences: {
            codingExperience: codingExperience ?? null,
            areaOfInterest: areaOfInterest ?? null,
            userGoal: userGoal ?? null,
          },
        });
      } catch {
        // Continue to next step even if update fails
      }
      transitionStep(() => setStep("quiz-finished"), "forward", step);
    }
  };

  const handleViewCourses = () => {
    navigateWithTransition("/courses/recommended")();
  };

  const renderStepContent = (stepKey: QuizStep) => {
    if (stepKey === "coding-experience") {
      return (
        <CodingExperienceStep
          selectedId={codingExperience}
          onSelect={setCodingExperience}
          onContinue={handleContinue}
          canContinue={codingExperience !== null}
        />
      );
    }
    if (stepKey === "area-of-interest") {
      return (
        <AreaOfInterestStep
          selectedId={areaOfInterest}
          onSelect={setAreaOfInterest}
          onContinue={handleContinue}
          canContinue={areaOfInterest !== null}
        />
      );
    }
    if (stepKey === "user-goal") {
      return (
        <UserGoalStep
          selectedId={userGoal}
          onSelect={setUserGoal}
          onContinue={handleContinue}
          canContinue={userGoal !== null}
        />
      );
    }
    if (stepKey === "quiz-finished") {
      return <QuizFinishedStep onViewCourses={handleViewCourses} />;
    }
    return null;
  };

  return (
    <PageRoot data-test="recommendation-quiz-page">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <PageNavigation
          topNavigation={
            <ProgressNavbar
              leftButton={
                showBack
                  ? {
                      icon: "chevronLeft",
                      onClick: handleBack,
                    }
                  : undefined
              }
              progressValue={progressValue}
            />
          }
          mainNavigation="hidden"
        />

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            width: "100%",
          }}
        >
          <Box
            key={step}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              width: "100%",
              ...(leavingStep && {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }),
              ...(mobile &&
                hasTransitioned && {
                  animation: `${
                    transitionDirection === "forward"
                      ? "slide-in-right"
                      : "slide-in-left"
                  } 300ms ease-out both`,
                }),
            }}
          >
            {renderStepContent(step)}
          </Box>

          {mobile && leavingStep && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                animation: `${
                  transitionDirection === "forward"
                    ? "slide-out-left"
                    : "slide-out-right"
                } 300ms ease-out both`,
              }}
            >
              {renderStepContent(leavingStep)}
            </Box>
          )}
        </Box>
      </Box>
    </PageRoot>
  );
};

export default RecommendationQuizPage;

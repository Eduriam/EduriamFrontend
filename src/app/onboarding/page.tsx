"use client";

import { PageRoot, ProgressNavbar } from "@eduriam/ui-core";
import theme from "styles/theme";

import { useState } from "react";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";
import AccountSetupAPI from "infrastructure/api/users/me/account-setup/AccountSetupAPI";
import UserCoursesAPI from "infrastructure/api/users/me/courses/UserCoursesAPI";
import RecommendedCoursesAPI from "infrastructure/api/users/me/recommended-courses/RecommendedCoursesAPI";
import SettingsAPI from "infrastructure/api/users/me/settings/SettingsAPI";
import useAuth from "infrastructure/services/AuthProvider";

import AreaOfInterestStep from "../courses/recommended/quiz/components/AreaOfInterestStep";
import CodingExperienceStep from "../courses/recommended/quiz/components/CodingExperienceStep";
import UserGoalStep from "../courses/recommended/quiz/components/UserGoalStep";
import AllCoursesStep from "./components/AllCoursesStep";
import DailyGoalStep from "./components/DailyGoalStep";
import OnboardingCompleteStep from "./components/OnboardingCompleteStep";
import RecommendedCoursesStep from "./components/RecommendedCoursesStep";
import ValuePropositionStep from "./components/ValuePropositionStep";
import { useOnboardingStepTransition } from "./useOnboardingStepTransition";

type OnboardingStep =
  | "coding-experience"
  | "area-of-interest"
  | "user-goal"
  | "value-proposition"
  | "recommended-courses"
  | "all-courses"
  | "daily-goal"
  | "complete";

const STEPS: OnboardingStep[] = [
  "coding-experience",
  "area-of-interest",
  "user-goal",
  "value-proposition",
  "recommended-courses",
  "daily-goal",
  "complete",
];

export interface IOnboardingPage {}

const OnboardingPage: React.FC<IOnboardingPage> = () => {
  const { mutateUser } = useAuth();

  const [step, setStep] = useState<OnboardingStep>("coding-experience");
  const [codingExperience, setCodingExperience] = useState<string | null>(null);
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<Id | null>(null);
  const [dailyGoalValue, setDailyGoalValue] = useState<number | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const { recommendedCourses: recommendedFromApi } =
    RecommendedCoursesAPI.useRecommendedCourses();
  const { courses } = CoursesAPI.useCourses();
  const recommendedCourses = (recommendedFromApi ?? [])
    .filter((course) => !course.premium)
    .slice(0, 3);
  const allCourses = (courses ?? []).filter((course) => !course.premium);
  const htmlCourseId = allCourses.find(
    (c) => c.name?.toLowerCase().includes("html") || c.id === "html",
  )?.id;
  const displayCourses = showAllCourses ? allCourses : recommendedCourses;

  const currentStepIndex = STEPS.indexOf(step);
  const showBack = currentStepIndex > 0 && step !== "all-courses";
  const progressValue =
    STEPS.length > 1
      ? Math.round((currentStepIndex / (STEPS.length - 1)) * 100)
      : 0;

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    transitionStep,
    transitionDirection,
    hasTransitioned,
    leavingStep,
    leavingShowAllCourses,
  } = useOnboardingStepTransition<OnboardingStep>();

  const handleBack = () => {
    if (step === "recommended-courses" && showAllCourses) {
      transitionStep(
        () => {
          setShowAllCourses(false);
          setStep("recommended-courses");
        },
        "back",
        "recommended-courses",
        { leavingShowAllCourses: showAllCourses },
      );
    } else if (currentStepIndex > 0) {
      transitionStep(() => setStep(STEPS[currentStepIndex - 1]), "back", step);
    }
  };

  const handleContinue = async () => {
    if (step === "coding-experience" && codingExperience) {
      transitionStep(() => setStep("area-of-interest"), "forward", step);
    } else if (step === "area-of-interest" && areaOfInterest) {
      transitionStep(() => setStep("user-goal"), "forward", step);
    } else if (step === "user-goal" && userGoal) {
      await updateCoursePreferences();
      transitionStep(() => setStep("value-proposition"), "forward", step);
    } else if (step === "value-proposition") {
      transitionStep(() => setStep("recommended-courses"), "forward", step);
    } else if (step === "daily-goal" && dailyGoalValue !== null) {
      submitOnboarding();
    }
  };

  const updateCoursePreferences = async () => {
    try {
      await SettingsAPI.updateSettings({
        coursePreferences: {
          codingExperience: codingExperience ?? undefined,
          areaOfInterest: areaOfInterest ?? undefined,
          userGoal: userGoal ?? undefined,
        },
      });
    } catch {
      // Continue to next step even if update fails
    }
  };

  const submitOnboarding = async () => {
    if (selectedCourseId === null || dailyGoalValue === null) {
      return;
    }
    try {
      await AccountSetupAPI.setupAccount({ dailyGoal: dailyGoalValue });
      await UserCoursesAPI.enrollInCourse(selectedCourseId);
      await UserCoursesAPI.selectCourse(selectedCourseId);
      transitionStep(() => setStep("complete"), "forward", step);
    } catch {
      transitionStep(() => setStep("complete"), "forward", step);
    }
  };

  const handleCourseSelect = (courseId: Id) => {
    setSelectedCourseId(courseId);
    transitionStep(() => setStep("daily-goal"), "forward", step);
  };

  const handleExploreAll = () => {
    transitionStep(() => setShowAllCourses(true), "forward", step, {
      leavingShowAllCourses: showAllCourses,
    });
  };

  const renderStepContent = (
    stepKey: OnboardingStep,
    options?: { showAllCourses?: boolean },
  ) => {
    const useShowAll =
      options?.showAllCourses ??
      (stepKey === "recommended-courses" && showAllCourses);
    const isRecommended = stepKey === "recommended-courses" && !useShowAll;
    const isAllCourses = stepKey === "recommended-courses" && useShowAll;
    if (stepKey === "coding-experience") {
      return (
        <CodingExperienceStep
          selectedId={codingExperience}
          onSelect={setCodingExperience}
          onContinue={handleContinue}
          canContinue={!!codingExperience}
        />
      );
    }
    if (stepKey === "area-of-interest") {
      return (
        <AreaOfInterestStep
          selectedId={areaOfInterest}
          onSelect={setAreaOfInterest}
          onContinue={handleContinue}
          canContinue={!!areaOfInterest}
        />
      );
    }
    if (stepKey === "user-goal") {
      return (
        <UserGoalStep
          selectedId={userGoal}
          onSelect={setUserGoal}
          onContinue={handleContinue}
          canContinue={!!userGoal}
        />
      );
    }
    if (stepKey === "value-proposition") {
      return <ValuePropositionStep onContinue={handleContinue} />;
    }
    if (isRecommended) {
      return (
        <RecommendedCoursesStep
          courses={displayCourses}
          htmlCourseId={htmlCourseId}
          onCourseSelect={handleCourseSelect}
          onExploreAll={handleExploreAll}
        />
      );
    }
    if (isAllCourses) {
      return (
        <AllCoursesStep
          courses={allCourses}
          htmlCourseId={htmlCourseId}
          onCourseSelect={handleCourseSelect}
        />
      );
    }
    if (stepKey === "daily-goal") {
      return (
        <DailyGoalStep
          selectedValue={dailyGoalValue}
          onSelect={setDailyGoalValue}
          onContinue={handleContinue}
          canContinue={!!canContinue}
        />
      );
    }
    if (stepKey === "complete") {
      return <OnboardingCompleteStep onStartLearning={handleStartLearning} />;
    }
    return null;
  };

  const handleStartLearning = () => {
    // Route transition is handled by onboarding layout once user becomes initialized.
    mutateUser({ accountInitialized: true });
  };

  const canContinue =
    (step === "coding-experience" && codingExperience) ||
    (step === "area-of-interest" && areaOfInterest) ||
    (step === "user-goal" && userGoal) ||
    step === "value-proposition" ||
    (step === "daily-goal" && dailyGoalValue !== null);

  return (
    <PageRoot>
      <Box
        data-test="onboarding-page"
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
          {/* Entering step (slides in); when no transition, this is the only layer */}
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

          {/* Leaving step (slides out); only on mobile when transitioning */}
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
              {renderStepContent(leavingStep, {
                showAllCourses: leavingShowAllCourses ?? undefined,
              })}
            </Box>
          )}
        </Box>
      </Box>
    </PageRoot>
  );
};

export default OnboardingPage;

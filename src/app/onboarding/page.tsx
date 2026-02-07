"use client";

import { PageRoot, ProgressNavbar } from "@eduriam/ui-core";
import icons from "styles/icons";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";
import AccountSetupAPI from "infrastructure/api/user/account-setup/AccountSetupAPI";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";
import useAuth from "infrastructure/services/AuthProvider";

import AllCoursesStep from "./components/AllCoursesStep";
import AreaOfInterestStep from "./components/AreaOfInterestStep";
import CodingExperienceStep from "./components/CodingExperienceStep";
import DailyGoalStep from "./components/DailyGoalStep";
import OnboardingCompleteStep from "./components/OnboardingCompleteStep";
import RecommendedCoursesStep from "./components/RecommendedCoursesStep";
import UserGoalStep from "./components/UserGoalStep";
import ValuePropositionStep from "./components/ValuePropositionStep";

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
  const revalidateUser = useAuth().revalidateUser;
  const router = useRouter();

  const [step, setStep] = useState<OnboardingStep>("coding-experience");
  const [codingExperience, setCodingExperience] = useState<string | null>(null);
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<Id | null>(null);
  const [dailyGoalValue, setDailyGoalValue] = useState<number | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const { courses } = CoursesAPI.useCourses({});
  const recommendedCourses = courses ?? [];
  const allCourses = courses ?? [];
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

  const handleBack = () => {
    if (step === "recommended-courses" && showAllCourses) {
      setShowAllCourses(false);
      setStep("recommended-courses");
    } else if (currentStepIndex > 0) {
      setStep(STEPS[currentStepIndex - 1]);
    }
  };

  const handleContinue = () => {
    if (step === "coding-experience" && codingExperience) {
      setStep("area-of-interest");
    } else if (step === "area-of-interest" && areaOfInterest) {
      setStep("user-goal");
    } else if (step === "user-goal" && userGoal) {
      setStep("value-proposition");
    } else if (step === "value-proposition") {
      setStep("recommended-courses");
    } else if (step === "daily-goal" && dailyGoalValue !== null) {
      submitOnboarding();
    }
  };

  const submitOnboarding = async () => {
    if (selectedCourseId === null || dailyGoalValue === null) {
      return;
    }
    try {
      await AccountSetupAPI.setupAccount({ dailyGoal: dailyGoalValue });
      await UserCoursesAPI.enrollInCourse(selectedCourseId, {
        startingLevel: "a1",
        selectedTopicIds: [],
      });
      await UserCoursesAPI.selectCourse(selectedCourseId);
      await revalidateUser();
      setStep("complete");
    } catch {
      setStep("complete");
    }
  };

  const handleCourseSelect = (courseId: Id) => {
    setSelectedCourseId(courseId);
    setStep("daily-goal");
  };

  const handleStartLearning = () => {
    router.push("/");
  };

  const canContinue =
    (step === "coding-experience" && codingExperience) ||
    (step === "area-of-interest" && areaOfInterest) ||
    (step === "user-goal" && userGoal) ||
    step === "value-proposition" ||
    (step === "daily-goal" && dailyGoalValue !== null);

  return (
    <PageRoot>
      <Box data-test="onboarding-page" sx={{ display: "contents" }}>
        <ProgressNavbar
          leftButton={
            showBack
              ? {
                  icon: icons.back,
                  onClick: handleBack,
                }
              : undefined
          }
          progressValue={progressValue}
        />

        {step === "coding-experience" && (
          <CodingExperienceStep
            selectedId={codingExperience}
            onSelect={setCodingExperience}
            onContinue={handleContinue}
            canContinue={!!codingExperience}
          />
        )}

        {step === "area-of-interest" && (
          <AreaOfInterestStep
            selectedId={areaOfInterest}
            onSelect={setAreaOfInterest}
            onContinue={handleContinue}
            canContinue={!!areaOfInterest}
          />
        )}

        {step === "user-goal" && (
          <UserGoalStep
            selectedId={userGoal}
            onSelect={setUserGoal}
            onContinue={handleContinue}
            canContinue={!!userGoal}
          />
        )}

        {step === "value-proposition" && (
          <ValuePropositionStep onContinue={handleContinue} />
        )}

        {step === "recommended-courses" && !showAllCourses && (
          <RecommendedCoursesStep
            courses={displayCourses}
            htmlCourseId={htmlCourseId}
            onCourseSelect={handleCourseSelect}
            onExploreAll={() => setShowAllCourses(true)}
          />
        )}

        {step === "recommended-courses" && showAllCourses && (
          <AllCoursesStep
            courses={allCourses}
            htmlCourseId={htmlCourseId}
            onCourseSelect={handleCourseSelect}
          />
        )}

        {step === "daily-goal" && (
          <DailyGoalStep
            selectedValue={dailyGoalValue}
            onSelect={setDailyGoalValue}
            onContinue={handleContinue}
            canContinue={!!canContinue}
          />
        )}

        {step === "complete" && (
          <OnboardingCompleteStep onStartLearning={handleStartLearning} />
        )}
      </Box>
    </PageRoot>
  );
};

export default OnboardingPage;

"use client";

import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  BasicNavbar,
  ContentContainer,
  Header,
  LargeButton,
  LargeRadioButtonGroup,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CourseCard from "components/courses/CourseCard/CourseCard";
import CourseLogo from "components/courses/CourseLogo/CourseLogo";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";
import AccountSetupAPI from "infrastructure/api/user/account-setup/AccountSetupAPI";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";
import useAuth from "infrastructure/services/AuthProvider";

import ValuePropositionListItem from "./components/ValuePropositionListItem";

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

const DAILY_GOAL_OPTIONS: Array<{ id: string; value: number }> = [
  { id: "5-option", value: 300000 },
  { id: "10-option", value: 600000 },
  { id: "15-option", value: 900000 },
  { id: "20-option", value: 1200000 },
];

export interface IOnboardingPage {}

const OnboardingPage: React.FC<IOnboardingPage> = () => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");
  const { revalidateUser } = useAuth();
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

  const codingExperienceOptions: LargeRadioButtonOption[] = [
    {
      id: "beginner-option",
      text: tForm("onboarding.codingExperienceOptions.beginner.text"),
      subText: tForm("onboarding.codingExperienceOptions.beginner.subText"),
      "data-test": "beginner-option",
    },
    {
      id: "intermediate-option",
      text: tForm("onboarding.codingExperienceOptions.intermediate.text"),
      subText: tForm("onboarding.codingExperienceOptions.intermediate.subText"),
      "data-test": "intermediate-option",
    },
    {
      id: "advanced-option",
      text: tForm("onboarding.codingExperienceOptions.advanced.text"),
      subText: tForm("onboarding.codingExperienceOptions.advanced.subText"),
      "data-test": "advanced-option",
    },
  ];

  const areaOfInterestOptions: LargeRadioButtonOption[] = [
    {
      id: "frontend-development-option",
      text: tForm("onboarding.areaOfInterestOptions.frontend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.frontend-development.subText",
      ),
      "data-test": "frontend-development-option",
    },
    {
      id: "backend-development-option",
      text: tForm("onboarding.areaOfInterestOptions.backend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.backend-development.subText",
      ),
      "data-test": "backend-development-option",
    },
    {
      id: "fullstack-option",
      text: tForm("onboarding.areaOfInterestOptions.fullstack.text"),
      subText: tForm("onboarding.areaOfInterestOptions.fullstack.subText"),
      "data-test": "fullstack-option",
    },
  ];

  const userGoalOptions: LargeRadioButtonOption[] = [
    {
      id: "switch-career-option",
      text: tForm("onboarding.userGoalOptions.switch-career.text"),
      subText: tForm("onboarding.userGoalOptions.switch-career.subText"),
      "data-test": "switch-career-option",
    },
    {
      id: "learn-hobby-option",
      text: tForm("onboarding.userGoalOptions.learn-hobby.text"),
      subText: tForm("onboarding.userGoalOptions.learn-hobby.subText"),
      "data-test": "learn-hobby-option",
    },
    {
      id: "improve-skills-option",
      text: tForm("onboarding.userGoalOptions.improve-skills.text"),
      subText: tForm("onboarding.userGoalOptions.improve-skills.subText"),
      "data-test": "improve-skills-option",
    },
  ];

  const goalOptionKey: Record<string, string> = {
    "5-option": "casual",
    "10-option": "medium",
    "15-option": "dedicated",
    "20-option": "intense",
  };
  const dailyGoalOptions: LargeRadioButtonOption[] = DAILY_GOAL_OPTIONS.map(
    (opt) => ({
      id: opt.id,
      text: tForm(
        `accountSetup.goalSelectOptions.${goalOptionKey[opt.id]}.name`,
      ),
      subText: tForm(
        `accountSetup.goalSelectOptions.${goalOptionKey[opt.id]}.description`,
      ),
      "data-test": opt.id,
    }),
  );

  const canContinue =
    (step === "coding-experience" && codingExperience) ||
    (step === "area-of-interest" && areaOfInterest) ||
    (step === "user-goal" && userGoal) ||
    step === "value-proposition" ||
    (step === "daily-goal" && dailyGoalValue !== null);

  return (
    <PageRoot>
      <Box data-test="onboarding-page" sx={{ display: "contents" }}>
        {showBack && (
          <BasicNavbar
            leftButton={{
              icon: icons.back,
              onClick: handleBack,
            }}
          />
        )}

        {/* Coding experience */}
        {step === "coding-experience" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="coding-experience-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.codingExperienceTitle")}
                />
                <Box sx={{ mt: 2 }}>
                  <LargeRadioButtonGroup
                    data-test="coding-experience-radio-group"
                    options={codingExperienceOptions}
                    onChange={setCodingExperience}
                    fullWidth
                  />
                </Box>
                <LargeButton
                  data-test="continue-button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  {tCommon("navigation.continue")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* Area of interest */}
        {step === "area-of-interest" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="area-of-interest-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.areaOfInterestTitle")}
                />
                <Box sx={{ mt: 2 }}>
                  <LargeRadioButtonGroup
                    data-test="area-of-interest-radio-group"
                    options={areaOfInterestOptions}
                    onChange={setAreaOfInterest}
                    fullWidth
                  />
                </Box>
                <LargeButton
                  data-test="continue-button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  {tCommon("navigation.continue")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* User goal */}
        {step === "user-goal" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="user-goal-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.userGoalTitle")}
                />
                <Box sx={{ mt: 2 }}>
                  <LargeRadioButtonGroup
                    data-test="user-goal-radio-group"
                    options={userGoalOptions}
                    onChange={setUserGoal}
                    fullWidth
                  />
                </Box>
                <LargeButton
                  data-test="continue-button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  {tCommon("navigation.continue")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* Value proposition */}
        {step === "value-proposition" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="value-proposition-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.valuePropositionTitle")}
                />
                <Stack spacing={0} sx={{ mt: 2 }}>
                  <ValuePropositionListItem
                    title={tForm("onboarding.valuePropositionTitle")}
                    illustrationName="eduriam-logo"
                  />
                </Stack>
                <LargeButton
                  data-test="continue-button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  {tCommon("navigation.continue")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* Recommended courses */}
        {step === "recommended-courses" && !showAllCourses && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="recommended-courses-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.recommendedForYou")}
                />
                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                  {displayCourses.map((course, index) => (
                    <Box
                      key={course.id}
                      data-test={
                        index === 0 ||
                        course.id === htmlCourseId ||
                        course.name?.toLowerCase().includes("html")
                          ? "html-course-card"
                          : undefined
                      }
                    >
                      <CourseCard
                        title={course.name}
                        icon={
                          <CourseLogo
                            variant={
                              course.name?.toLowerCase().includes("javascript")
                                ? "JavaScript"
                                : "HTML"
                            }
                          />
                        }
                        onClick={() => handleCourseSelect(course.id)}
                      />
                    </Box>
                  ))}
                </Stack>

                <LargeButton
                  data-test="explore-all-courses-button"
                  onClick={() => setShowAllCourses(true)}
                >
                  {tForm("onboarding.exploreAllCourses")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* All courses */}
        {step === "recommended-courses" && showAllCourses && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="all-courses-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.exploreAllCourses")}
                />
                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                  {allCourses.map((course, index) => (
                    <Box
                      key={course.id}
                      data-test={
                        index === 0 ||
                        course.id === htmlCourseId ||
                        course.name?.toLowerCase().includes("html")
                          ? "html-course-card"
                          : undefined
                      }
                    >
                      <CourseCard
                        title={course.name}
                        icon={
                          <CourseLogo
                            variant={
                              course.name?.toLowerCase().includes("javascript")
                                ? "JavaScript"
                                : "HTML"
                            }
                          />
                        }
                        onClick={() => handleCourseSelect(course.id)}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* Daily goal */}
        {step === "daily-goal" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="daily-goal-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.dailyGoalTitle")}
                />
                <Box sx={{ mt: 2 }}>
                  <LargeRadioButtonGroup
                    data-test="daily-goal-radio-group"
                    options={dailyGoalOptions}
                    onChange={(id) => {
                      const opt = DAILY_GOAL_OPTIONS.find((o) => o.id === id);
                      if (opt) {
                        setDailyGoalValue(opt.value);
                      }
                    }}
                    fullWidth
                  />
                </Box>

                <LargeButton
                  data-test="continue-button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  {tCommon("navigation.continue")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}

        {/* Complete */}
        {step === "complete" && (
          <ContentContainer width="small">
            <Stack spacing={3} sx={{ py: 2 }}>
              <Box data-test="onboarding-complete-section">
                <Header
                  component="h1"
                  text={tForm("onboarding.startLearning")}
                />
                <LargeButton
                  data-test="start-learning-button"
                  onClick={handleStartLearning}
                >
                  {tForm("onboarding.startLearning")}
                </LargeButton>
              </Box>
            </Stack>
          </ContentContainer>
        )}
      </Box>
    </PageRoot>
  );
};

export default OnboardingPage;

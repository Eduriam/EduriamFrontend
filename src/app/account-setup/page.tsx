"use client";

import { PageRoot } from "@eduriam/ui-core";
import icons from "styles/icons";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";

import NavigationBar from "components/atoms/navigation/top-navigation-bars/NavigationBar/NavigationBar";
import PlacementTest from "components/molecules/PlacementTest/PlacementTest";
import InitialSurveyForm from "components/molecules/forms/InitialSurveyForm/InitialSurveyForm";
import SelectCourseForm from "components/molecules/forms/SelectCourseForm/SelectCourseForm";
import SelectGoalForm from "components/molecules/forms/SelectGoalForm/SelectGoalForm";
import { GoalOption } from "components/molecules/forms/SelectGoalForm/config";
import SelectLevelForm from "components/molecules/forms/SelectLevelForm/SelectLevelForm";
import { LanguageLevel } from "components/molecules/forms/SelectLevelForm/config";
import SelectStartForm from "components/molecules/forms/SelectStartForm/SelectStartForm";
import { StartOptionId } from "components/molecules/forms/SelectStartForm/config";
import SelectTopicsForm from "components/molecules/forms/SelectTopicsForm/SelectTopicsForm";

import AccountSetupAPI from "infrastructure/api/user/account-setup/AccountSetupAPI";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";
import { SurveyAnswer } from "infrastructure/api/user/survey-answers/SurveyAnswers";
import { Topic } from "infrastructure/api/user/topics/Topics";
import useAuth from "infrastructure/services/AuthProvider";

export interface IAccountSetupPage {}

const AccountSetupPage: React.FC<IAccountSetupPage> = () => {
  const { revalidateUser } = useAuth();
  const [page, setPage] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState<Id>();
  const [selectedTopics, setSelectedTopics] = useState<Array<Topic>>();
  const [surveyAnswer, setSurveyAnswer] =
    useState<Omit<SurveyAnswer, "userId">>();
  const [selectedGoal, setSelectedGoal] = useState<GoalOption>();
  const [startOptionId, setStartOptionId] = useState<StartOptionId>();
  const [startingLevel, setStartingLevel] = useState<LanguageLevel>();
  const router = useRouter();

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    if (startingLevel) {
      submitSetup();
    }

    async function submitSetup() {
      // Isn't implemented on backend in v1.0.0
      // if (surveyAnswer) SurveyAnswersAPI.createSurveyAnswer(surveyAnswer);

      if (startingLevel && selectedCourseId && selectedGoal && selectedTopics) {
        await AccountSetupAPI.setupAccount({
          dailyGoal: selectedGoal.value,
        });

        await UserCoursesAPI.enrollInCourse(selectedCourseId);

        await UserCoursesAPI.selectCourse(selectedCourseId);

        await revalidateUser();
        router.push("/");
      }
    }
  }, [
    startingLevel,
    selectedCourseId,
    selectedGoal,
    selectedTopics,
    surveyAnswer,
    revalidateUser,
    router,
  ]);

  useEffect(() => {
    if (startOptionId === "startFromZero") {
      setStartingLevel("a1");
    }
  }, [startOptionId, setStartingLevel]);

  return (
    <PageRoot data-test="account-setup-page">
      {page !== 0 && (page !== 5 || startOptionId !== "takeTest") && (
        <NavigationBar
          leftIconButton={{
            icon: icons.back,
            onClick: () => {
              decrementPage();
            },
          }}
          color="transparent"
        />
      )}

      <Container sx={{ maxWidth: "500px" }}>
        {page === 0 ? (
          <SelectCourseForm
            onSubmit={(courseId) => {
              setSelectedCourseId(courseId);
              incrementPage();
            }}
          />
        ) : page === 1 ? (
          <>
            {selectedCourseId && (
              <SelectTopicsForm
                courseId={selectedCourseId}
                onSubmit={(topics) => {
                  setSelectedTopics(topics);
                  incrementPage();
                }}
              />
            )}
          </>
        ) : page === 2 ? (
          <InitialSurveyForm
            onSubmit={(answer) => {
              setSurveyAnswer(answer);
              incrementPage();
            }}
          />
        ) : page === 3 ? (
          <SelectGoalForm
            onSubmit={(goal) => {
              setSelectedGoal(goal);
              incrementPage();
            }}
          />
        ) : page === 4 ? (
          <SelectStartForm
            onSubmit={(startOptionId) => {
              setStartOptionId(startOptionId);

              if (startOptionId !== "startFromZero") {
                incrementPage();
              }
            }}
          />
        ) : (
          <>
            {startOptionId === "selectLevel" && (
              <SelectLevelForm
                onSubmit={(levelOption) => setStartingLevel(levelOption.id)}
              />
            )}

            {startOptionId === "takeTest" && selectedCourseId && (
              <PlacementTest
                courseId={selectedCourseId}
                onSubmit={(levelOption) => setStartingLevel(levelOption)}
                onCancel={() => {
                  decrementPage();
                  setStartOptionId(undefined);
                }}
              />
            )}
          </>
        )}
      </Container>
    </PageRoot>
  );
};

export default AccountSetupPage;

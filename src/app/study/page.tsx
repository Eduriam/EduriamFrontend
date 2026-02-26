"use client";

import { PageRoot } from "@eduriam/ui-core";
import {
  AtomProgressRating,
  StudySession,
  StudySessionDataTest,
  StudySessionLocalization,
} from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

export interface IStudyPage {}

const STUDY_SESSION_DATA_TEST: StudySessionDataTest = {
  explanationBlockSection: "explanation-block-section",
  continueButton: "continue-button",
  multipleChoiceExercise: {
    exerciseSection: "multiple-choice-exercise",
    correctAnswerButton: "multiple-choice-exercise-correct-answer-button",
    incorrectAnswerButton: "multiple-choice-exercise-incorrect-answer-button",
  },
  checkAnswerButton: "check-answer-button",
  correctAnswerDrawer: "correct-answer",
  incorrectAnswerDrawer: "incorrect-answer",
  showExplanationButton: "show-explanation-button",
  exerciseAnswerExplanationSection: "exercise-answer-explanation-section",
  gotItButton: "got-it-button",
  retryExerciseButton: "retry-exercise-button",
  skipExerciseButton: "skip-exercise-button",
  studyStatsSection: "study-stats-section",
};

const StudyPage: React.FC<IStudyPage> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation("common");

  const [lessonId, setLessonId] = useState<Id | undefined>(() => {
    const lessonIdParam = searchParams.get("lessonId");
    return lessonIdParam ?? undefined;
  });

  useEffect(() => {
    const lessonIdParam = searchParams.get("lessonId");

    if (lessonIdParam) {
      setLessonId(lessonIdParam);
      router.replace("/study", {
        scroll: false,
      });
    }
  }, [router, searchParams]);

  const localization: StudySessionLocalization = {
    studyBlock: {
      continueButton: t("exercise.continue"),
      checkButton: t("exercise.check"),
    },
    studySessionDrawer: {
      titleCorrect: t("exercise.right"),
      titleIncorrect: t("exercise.wrong"),
      explanationTitle: t("exercise.explanationTitle"),
      whyButton: t("exercise.why"),
      continueButton: t("exercise.continue"),
      skipExerciseButton: t("exercise.skipExercise"),
    },
    multipleChoiceExercise: {
      assignmentTitle: t("exercises.multipleChoice.assignmentTitle"),
    },
    studySessionStats: {
      title: t("studySessionStats.title"),
      xpGained: t("studySessionStats.xpGained"),
      minStudied: t("studySessionStats.minStudied"),
      correct: t("studySessionStats.successRate"),
      newConcepts: t("studySessionStats.newConcepts"),
      continueButton: t("navigation.continue"),
    },
  };

  const { studySession, isLoading } = StudySessionAPI.useStudySession({
    lessonId,
  });

  const handleFinish = async (
    atomProgressRatings: Array<AtomProgressRating>,
  ) => {
    await StudySessionAPI.updateStudySession({
      lessonId,
      atomProgress: atomProgressRatings.map((rating) => ({
        atomId: rating.atomId,
        rating: rating.rating,
      })),
    });
  };

  if (isLoading || !studySession) {
    return null;
  }

  return (
    <PageRoot data-test="study-page">
      <StudySession
        studySession={studySession}
        onFinish={handleFinish}
        onExit={() => router.push("/review")}
        localization={localization}
        dataTest={STUDY_SESSION_DATA_TEST}
      />
    </PageRoot>
  );
};

export default StudyPage;

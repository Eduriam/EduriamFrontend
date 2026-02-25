"use client";

import {
  AtomProgressRating,
  StudySession,
  StudySessionDataTest,
  StudySessionLocalization,
} from "@eduriam/ui-x";
import { useTranslation } from "i18n/client";

import { useRouter } from "next/navigation";

import StudySessionAPI from "infrastructure/api/user/courses/study-session/StudySessionAPI";

interface ILessonLearningSession {
  lessonId?: Id;
}

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

const LessonLearningSession: React.FC<ILessonLearningSession> = ({
  lessonId,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const localization: StudySessionLocalization = {
    studyBlock: {
      continueButton: t("exercise.continue"),
      checkButton: t("exercise.check"),
    },
    studySessionDrawer: {
      titleCorrect: t("exercise.right"),
      titleIncorrect: t("exercise.wrong"),
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
    <StudySession
      studySession={studySession}
      onFinish={handleFinish}
      onExit={() => router.push("/review")}
      localization={localization}
      dataTest={STUDY_SESSION_DATA_TEST}
    />
  );
};

export default LessonLearningSession;

import {
  StudySessionDataTest,
  StudySessionLocalization,
} from "@eduriam/ui-x";

export const STUDY_SESSION_DATA_TEST: StudySessionDataTest = {
  explanationBlock: {
    section: "explanation-block-section",
    continueButton: "continue-button",
    reportButton: "report-study-block-button",
  },
  exerciseBlock: {
    checkAnswerButton: "check-answer-button",
  },
  studyBlockNavigation: {
    previousStudyBlockButton: "previous-study-block-button",
    nextStudyBlockButton: "next-study-block-button",
  },
  exercises: {
    multipleChoiceExercise: {
      exerciseSection: "multiple-choice-exercise",
      correctAnswerButton: "multiple-choice-exercise-correct-answer-button",
      incorrectAnswerButton: "multiple-choice-exercise-incorrect-answer-button",
    },
  },
  studySessionDrawer: {
    correctAnswerDrawer: "correct-answer",
    incorrectAnswerDrawer: "incorrect-answer",
    skipExerciseButton: "skip-exercise-button",
    showExplanationButton: "show-explanation-button",
    continueButton: "continue-button",
    retryExerciseButton: "retry-exercise-button",
    reportButton: "report-study-block-button",
  },
  studyStats: {
    section: "study-stats-section",
    continueButton: "continue-button",
  },
  explanation: {
    gotItButton: "got-it-button",
    section: "exercise-answer-explanation-section",
  },
};

export function createStudySessionLocalization(
  t: (key: string) => string,
): StudySessionLocalization {
  return {
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
}

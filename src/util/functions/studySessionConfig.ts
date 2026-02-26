import { DrawerSelectSection } from "@eduriam/ui-core";
import {
  ReportStudyBlockDialogDataTest,
  ReportStudyBlockDialogLocalization,
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

export const STUDY_BLOCK_REPORT_DATA_TEST: ReportStudyBlockDialogDataTest = {
  report: {
    section: "report-study-block-section",
    problemTypeSelectButton: "problem-type-select-button",
    problemDescriptionField: "problem-description-field",
    submitButton: "submit-button",
  },
  selectDrawer: {
    section: "problem-type-select-drawer",
  },
  thankYouSection: {
    section: "thank-you-section",
    continueButton: "thank-you-continue-button",
  },
};

export function createStudyBlockReportProblemTypeSections(
  t: (key: string) => string,
): DrawerSelectSection[] {
  return [
    {
      id: "user-problems",
      title: t("reportStudyBlock.problemGroups.user.title"),
      dataTest: "problem-group-section",
      options: [
        {
          id: "problem-option-1",
          label: t("reportStudyBlock.problemGroups.user.options.incorrectContent"),
          dataTest: "problem-option-1-button",
        },
        {
          id: "problem-option-2",
          label: t(
            "reportStudyBlock.problemGroups.user.options.unclearExplanation",
          ),
          dataTest: "problem-option-2-button",
        },
      ],
    },
    {
      id: "corrector-problems",
      title: t("reportStudyBlock.problemGroups.corrector.title"),
      dataTest: "problem-group-corrector-section",
      options: [
        {
          id: "problem-option-corrector-1",
          label: t(
            "reportStudyBlock.problemGroups.corrector.options.wrongMetadata",
          ),
          dataTest: "problem-option-corrector-1-button",
        },
        {
          id: "problem-option-corrector-2",
          label: t(
            "reportStudyBlock.problemGroups.corrector.options.invalidStructure",
          ),
          dataTest: "problem-option-corrector-2-button",
        },
      ],
    },
  ];
}

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

export function createStudyBlockReportLocalization(
  t: (key: string) => string,
): ReportStudyBlockDialogLocalization {
  return {
    header: t("reportStudyBlock.header"),
    problemTypePlaceholder: t("reportStudyBlock.problemTypePlaceholder"),
    descriptionPlaceholder: t("reportStudyBlock.descriptionPlaceholder"),
    submitLabel: t("reportStudyBlock.submitLabel"),
    thankYouSection: {
      title: t("reportStudyBlock.thankYouTitle"),
      description: t("reportStudyBlock.thankYouDescription"),
      continueButton: t("navigation.continue"),
    },
  };
}

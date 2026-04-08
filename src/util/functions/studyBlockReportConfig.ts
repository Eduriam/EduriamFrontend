import { DrawerSelectSection } from "@eduriam/ui-core";
import {
  ReportDialogDataTest,
  ReportDialogLocalization,
  StudyBlockType,
} from "@eduriam/ui-x";
import { ReportProblemType } from "infrastructure/api/generated/models";

export const STUDY_BLOCK_REPORT_DATA_TEST: ReportDialogDataTest = {
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

type StudyBlockAnswerState = "RIGHT" | "WRONG" | "NONE" | null;

interface StudyBlockReportProblemTypeContext {
  studyBlockType: StudyBlockType;
  answerState: StudyBlockAnswerState;
  isCorrector: boolean;
}

type ProblemSectionOption = {
  id: string;
  labelKey: string;
  dataTest: string;
};

type ProblemSectionTemplate = {
  id: string;
  titleKey: string;
  dataTest: string;
  optionIds: Array<keyof typeof REPORT_PROBLEM_OPTION_TEMPLATES>;
};

const REPORT_PROBLEM_OPTION_TEMPLATES = {
  explanationNotUnderstood: {
    id: String(ReportProblemType.ExplanationNotUnderstood),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.explanationNotUnderstood",
    dataTest: "problem-option-explanation-not-understood-button",
  },
  exerciseNotUnderstood: {
    id: String(ReportProblemType.ExerciseNotUnderstood),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.exerciseNotUnderstood",
    dataTest: "problem-option-exercise-not-understood-button",
  },
  answerShouldNotBeAccepted: {
    id: String(ReportProblemType.AnswerShouldNotBeAccepted),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.answerShouldNotBeAccepted",
    dataTest: "problem-option-answer-should-not-be-accepted-button",
  },
  answerShouldBeAccepted: {
    id: String(ReportProblemType.AnswerShouldBeAccepted),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.answerShouldBeAccepted",
    dataTest: "problem-option-answer-should-be-accepted-button",
  },
  audioDoesNotSoundRight: {
    id: String(ReportProblemType.AudioDoesNotSoundRight),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.audioDoesNotSoundRight",
    dataTest: "problem-option-audio-does-not-sound-right-button",
  },
  audioMissing: {
    id: String(ReportProblemType.AudioMissing),
    labelKey: "reportStudyBlock.problemGroups.user.options.audioMissing",
    dataTest: "problem-option-audio-missing-button",
  },
  somethingElseWentWrong: {
    id: String(ReportProblemType.SomethingElseWentWrong),
    labelKey:
      "reportStudyBlock.problemGroups.user.options.somethingElseWentWrong",
    dataTest: "problem-option-something-else-went-wrong-button",
  },
  explanationStructureShouldBeChanged: {
    id: String(ReportProblemType.ExplanationStructureShouldBeChanged),
    labelKey:
      "reportStudyBlock.problemGroups.corrector.options.explanationStructureShouldBeChanged",
    dataTest: "problem-option-explanation-structure-should-be-changed-button",
  },
  exerciseStructureShouldBeChanged: {
    id: String(ReportProblemType.ExerciseStructureShouldBeChanged),
    labelKey:
      "reportStudyBlock.problemGroups.corrector.options.exerciseStructureShouldBeChanged",
    dataTest: "problem-option-exercise-structure-should-be-changed-button",
  },
  lessonStructureShouldBeChanged: {
    id: String(ReportProblemType.LessonStructureShouldBeChanged),
    labelKey:
      "reportStudyBlock.problemGroups.corrector.options.lessonStructureShouldBeChanged",
    dataTest: "problem-option-lesson-structure-should-be-changed-button",
  },
} as const;

const REPORT_PROBLEM_SECTION_TEMPLATES: Record<string, ProblemSectionTemplate> =
  {
    explanationUser: {
      id: "problem-type",
      titleKey: "reportStudyBlock.problemGroups.user.title",
      dataTest: "problem-group-section",
      optionIds: [
        "explanationNotUnderstood",
        "audioDoesNotSoundRight",
        "audioMissing",
        "somethingElseWentWrong",
      ],
    },
    exerciseCorrectAnswerUser: {
      id: "problem-type",
      titleKey: "reportStudyBlock.problemGroups.user.title",
      dataTest: "problem-group-section",
      optionIds: [
        "exerciseNotUnderstood",
        "answerShouldNotBeAccepted",
        "audioDoesNotSoundRight",
        "audioMissing",
        "somethingElseWentWrong",
      ],
    },
    exerciseWrongAnswerUser: {
      id: "problem-type",
      titleKey: "reportStudyBlock.problemGroups.user.title",
      dataTest: "problem-group-section",
      optionIds: [
        "exerciseNotUnderstood",
        "answerShouldBeAccepted",
        "audioDoesNotSoundRight",
        "audioMissing",
        "somethingElseWentWrong",
      ],
    },
    explanationCorrector: {
      id: "reviewer-options",
      titleKey: "reportStudyBlock.problemGroups.corrector.title",
      dataTest: "problem-group-corrector-section",
      optionIds: [
        "explanationStructureShouldBeChanged",
        "lessonStructureShouldBeChanged",
      ],
    },
    exerciseCorrector: {
      id: "reviewer-options",
      titleKey: "reportStudyBlock.problemGroups.corrector.title",
      dataTest: "problem-group-corrector-section",
      optionIds: [
        "exerciseStructureShouldBeChanged",
        "lessonStructureShouldBeChanged",
      ],
    },
  };

const getProblemSectionTemplateIds = (
  context: StudyBlockReportProblemTypeContext,
): string[] => {
  if (context.studyBlockType === StudyBlockType.Explanation) {
    return context.isCorrector
      ? ["explanationUser", "explanationCorrector"]
      : ["explanationUser"];
  }

  const userTemplateId =
    context.answerState === "RIGHT"
      ? "exerciseCorrectAnswerUser"
      : "exerciseWrongAnswerUser";

  return context.isCorrector
    ? [userTemplateId, "exerciseCorrector"]
    : [userTemplateId];
};

const mapSectionOption = (
  t: (key: string) => string,
  option: ProblemSectionOption,
) => ({
  id: option.id,
  label: t(option.labelKey),
  dataTest: option.dataTest,
});

const mapSectionTemplate = (
  t: (key: string) => string,
  sectionTemplate: ProblemSectionTemplate,
): DrawerSelectSection => ({
  id: sectionTemplate.id,
  title: t(sectionTemplate.titleKey),
  dataTest: sectionTemplate.dataTest,
  options: sectionTemplate.optionIds.map((optionId) =>
    mapSectionOption(t, REPORT_PROBLEM_OPTION_TEMPLATES[optionId]),
  ),
});

export function createStudyBlockReportProblemTypeSections(
  t: (key: string) => string,
  context: StudyBlockReportProblemTypeContext,
): DrawerSelectSection[] {
  return getProblemSectionTemplateIds(context).map((sectionTemplateId) =>
    mapSectionTemplate(t, REPORT_PROBLEM_SECTION_TEMPLATES[sectionTemplateId]),
  );
}

export function createStudyBlockReportLocalization(
  t: (key: string) => string,
): ReportDialogLocalization {
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

import { DrawerSelectSection } from "@eduriam/ui-core";
import { ReportDialogDataTest, ReportDialogLocalization } from "@eduriam/ui-x";
import { ReportProblemType } from "infrastructure/api/generated/models";

export const SETTINGS_REPORT_DATA_TEST: ReportDialogDataTest = {
  report: {
    section: "settings-report-section",
    problemTypeSelectButton: "settings-report-problem-type-select-button",
    problemDescriptionField: "settings-report-problem-description-field",
    submitButton: "settings-report-submit-button",
  },
  selectDrawer: {
    section: "settings-report-select-drawer",
  },
  thankYouSection: {
    section: "settings-report-thank-you-section",
    continueButton: "settings-report-thank-you-continue-button",
  },
};

export function createSettingsReportProblemTypeSections(
  t: (key: string) => string,
): DrawerSelectSection[] {
  const bugReportId = String(ReportProblemType.BugReport);
  const improvementSuggestionId = String(
    ReportProblemType.ImprovementSuggestion,
  );

  return [
    {
      id: "problem-type",
      title: t("settings.report.problemType"),
      dataTest: "settings-report-problem-type-section",
      options: [
        {
          id: bugReportId,
          label: t("settings.report.problemTypes.bugReport"),
          dataTest: "settings-report-problem-type-bug-option-button",
        },
        {
          id: improvementSuggestionId,
          label: t("settings.report.problemTypes.improvementSuggestion"),
          dataTest: "settings-report-problem-type-improvement-option-button",
        },
      ],
    },
  ];
}

export function createSettingsReportLocalization(
  t: (key: string) => string,
): ReportDialogLocalization {
  return {
    header: t("settings.report.header"),
    problemTypePlaceholder: t("settings.report.problemTypePlaceholder"),
    descriptionPlaceholder: t("settings.report.descriptionPlaceholder"),
    submitLabel: t("settings.report.submit"),
    thankYouSection: {
      title: t("settings.report.thankYouTitle"),
      description: t("settings.report.thankYouDescription"),
      continueButton: t("navigation.continue"),
    },
  };
}

import { LanguageLevel } from "components/molecules/forms/SelectLevelForm/config";

import { DailyGoal } from "infrastructure/api/user/settings/Settings";

export interface AccountSetup {
  dailyGoal: DailyGoal;
}

export type StartingLevel = LanguageLevel;

"use client";

import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  ContentContainer,
  Header,
  LargeButton,
  LargeRadioButtonGroup,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const DAILY_GOAL_OPTIONS: Array<{ id: string; value: number }> = [
  { id: "5-option", value: 300000 },
  { id: "10-option", value: 600000 },
  { id: "15-option", value: 900000 },
  { id: "20-option", value: 1200000 },
];

const GOAL_OPTION_KEY: Record<string, string> = {
  "5-option": "casual",
  "10-option": "medium",
  "15-option": "dedicated",
  "20-option": "intense",
};

export interface IDailyGoalStepProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onContinue: () => void;
  canContinue: boolean;
}

const DailyGoalStep: React.FC<IDailyGoalStepProps> = ({
  onSelect,
  onContinue,
  canContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  const options: LargeRadioButtonOption[] = DAILY_GOAL_OPTIONS.map(
    (opt) => ({
      id: opt.id,
      text: tForm(
        `accountSetup.goalSelectOptions.${GOAL_OPTION_KEY[opt.id]}.name`,
      ),
      subText: tForm(
        `accountSetup.goalSelectOptions.${GOAL_OPTION_KEY[opt.id]}.description`,
      ),
      "data-test": opt.id,
    }),
  );

  const handleChange = (id: string) => {
    const opt = DAILY_GOAL_OPTIONS.find((o) => o.id === id);
    if (opt) {
      onSelect(opt.value);
    }
  };

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="daily-goal-section">
        <Header
          variant="section"
          text={tForm("onboarding.dailyGoalTitle")}
        />
        <Box sx={{ mt: 2 }}>
          <LargeRadioButtonGroup
            data-test="daily-goal-radio-group"
            options={options}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Stack>
      <LargeButton
        data-test="continue-button"
        onClick={onContinue}
        disabled={!canContinue}
        fullWidth
      >
        {tCommon("navigation.continue")}
      </LargeButton>
    </ContentContainer>
  );
};

export default DailyGoalStep;

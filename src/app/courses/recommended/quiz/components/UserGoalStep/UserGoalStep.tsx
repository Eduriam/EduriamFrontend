"use client";

import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  ContentContainer,
  Header,
  LargeButton,
  LargeRadioButtonGroup,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import type { ProductUserGoal } from "infrastructure/api/generated/models";
import { ProductUserGoal as ProductUserGoalValues } from "infrastructure/api/generated/models";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface IUserGoalStepProps {
  selectedId: ProductUserGoal | null;
  onSelect: (id: ProductUserGoal) => void;
  onContinue: () => void;
  canContinue: boolean;
}

const UserGoalStep: React.FC<IUserGoalStepProps> = ({
  onSelect,
  onContinue,
  canContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  const options: LargeRadioButtonOption[] = [
    {
      id: String(ProductUserGoalValues.SwitchCareer),
      text: tForm("onboarding.userGoalOptions.switch-career.text"),
      "data-test": "switch-career-option",
    },
    {
      id: String(ProductUserGoalValues.BuildProject),
      text: tForm("onboarding.userGoalOptions.build-project.text"),
      "data-test": "build-project-option",
    },
    {
      id: String(ProductUserGoalValues.LearnForSchool),
      text: tForm("onboarding.userGoalOptions.learn-school.text"),
      "data-test": "learn-school-option",
    },
    {
      id: String(ProductUserGoalValues.AdvanceCareer),
      text: tForm("onboarding.userGoalOptions.advance-career.text"),
      "data-test": "advance-career-option",
    },
    {
      id: String(ProductUserGoalValues.LearnForFun),
      text: tForm("onboarding.userGoalOptions.learn-for-fun.text"),
      "data-test": "learn-for-fun-option",
    },
    {
      id: String(ProductUserGoalValues.Other),
      text: tForm("onboarding.userGoalOptions.something-else.text"),
      "data-test": "something-else-option",
    },
  ];

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="user-goal-section">
        <Header
          variant="section"
          text={tForm("onboarding.userGoalTitle")}
        />
        <Box sx={{ mt: 2 }}>
          <LargeRadioButtonGroup
            data-test="user-goal-radio-group"
            options={options}
            onChange={(id) => onSelect(Number(id) as ProductUserGoal)}
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

export default UserGoalStep;

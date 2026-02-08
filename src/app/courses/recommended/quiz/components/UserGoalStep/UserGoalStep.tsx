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

export interface IUserGoalStepProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
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
      id: "switch-career-option",
      text: tForm("onboarding.userGoalOptions.switch-career.text"),
      "data-test": "switch-career-option",
    },
    {
      id: "build-project-option",
      text: tForm("onboarding.userGoalOptions.build-project.text"),
      "data-test": "build-project-option",
    },
    {
      id: "learn-school-option",
      text: tForm("onboarding.userGoalOptions.learn-school.text"),
      "data-test": "learn-school-option",
    },
    {
      id: "advance-career-option",
      text: tForm("onboarding.userGoalOptions.advance-career.text"),
      "data-test": "advance-career-option",
    },
    {
      id: "learn-for-fun-option",
      text: tForm("onboarding.userGoalOptions.learn-for-fun.text"),
      "data-test": "learn-for-fun-option",
    },
    {
      id: "something-else-option",
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
            onChange={onSelect}
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

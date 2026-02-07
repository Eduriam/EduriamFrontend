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
      subText: tForm("onboarding.userGoalOptions.switch-career.subText"),
      "data-test": "switch-career-option",
    },
    {
      id: "learn-hobby-option",
      text: tForm("onboarding.userGoalOptions.learn-hobby.text"),
      subText: tForm("onboarding.userGoalOptions.learn-hobby.subText"),
      "data-test": "learn-hobby-option",
    },
    {
      id: "improve-skills-option",
      text: tForm("onboarding.userGoalOptions.improve-skills.text"),
      subText: tForm("onboarding.userGoalOptions.improve-skills.subText"),
      "data-test": "improve-skills-option",
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

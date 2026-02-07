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
  selectedId,
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
    <ContentContainer width="small">
      <Stack spacing={3} sx={{ py: 2 }}>
        <Box data-test="user-goal-section">
          <Header
            component="h1"
            text={tForm("onboarding.userGoalTitle")}
          />
          <Box sx={{ mt: 2 }}>
            <LargeRadioButtonGroup
              data-test="user-goal-radio-group"
              options={options}
              defaultSelectedId={selectedId ?? undefined}
              onChange={onSelect}
              fullWidth
            />
          </Box>
          <Box data-test="continue-button">
            <LargeButton
              onClick={onContinue}
              disabled={!canContinue}
            >
              {tCommon("navigation.continue")}
            </LargeButton>
          </Box>
        </Box>
      </Stack>
    </ContentContainer>
  );
};

export default UserGoalStep;

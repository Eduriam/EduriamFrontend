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

export interface ICodingExperienceStepProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
  canContinue: boolean;
}

const CodingExperienceStep: React.FC<ICodingExperienceStepProps> = ({
  selectedId,
  onSelect,
  onContinue,
  canContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  const options: LargeRadioButtonOption[] = [
    {
      id: "beginner-option",
      text: tForm("onboarding.codingExperienceOptions.beginner.text"),
      subText: tForm("onboarding.codingExperienceOptions.beginner.subText"),
      "data-test": "beginner-option",
    },
    {
      id: "intermediate-option",
      text: tForm("onboarding.codingExperienceOptions.intermediate.text"),
      subText: tForm("onboarding.codingExperienceOptions.intermediate.subText"),
      "data-test": "intermediate-option",
    },
    {
      id: "advanced-option",
      text: tForm("onboarding.codingExperienceOptions.advanced.text"),
      subText: tForm("onboarding.codingExperienceOptions.advanced.subText"),
      "data-test": "advanced-option",
    },
  ];

  return (
    <ContentContainer width="small">
      <Stack spacing={3} sx={{ py: 2 }}>
        <Box data-test="coding-experience-section">
          <Header
            component="h1"
            text={tForm("onboarding.codingExperienceTitle")}
          />
          <Box sx={{ mt: 2 }}>
            <LargeRadioButtonGroup
              data-test="coding-experience-radio-group"
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

export default CodingExperienceStep;

"use client";

import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  ContentContainer,
  Header,
  LargeButton,
  LargeRadioButtonGroup,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import type { ProductCodingExperience } from "infrastructure/api/generated/models";
import { ProductCodingExperience as ProductCodingExperienceValues } from "infrastructure/api/generated/models";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface ICodingExperienceStepProps {
  selectedId: ProductCodingExperience | null;
  onSelect: (id: ProductCodingExperience) => void;
  onContinue: () => void;
  canContinue: boolean;
}

const CodingExperienceStep: React.FC<ICodingExperienceStepProps> = ({
  onSelect,
  onContinue,
  canContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  const options: LargeRadioButtonOption[] = [
    {
      id: String(ProductCodingExperienceValues.Beginner),
      text: tForm("onboarding.codingExperienceOptions.beginner.text"),
      subText: tForm("onboarding.codingExperienceOptions.beginner.subText"),
      "data-test": "beginner-option",
    },
    {
      id: String(ProductCodingExperienceValues.Intermediate),
      text: tForm("onboarding.codingExperienceOptions.intermediate.text"),
      subText: tForm("onboarding.codingExperienceOptions.intermediate.subText"),
      "data-test": "intermediate-option",
    },
    {
      id: String(ProductCodingExperienceValues.Advanced),
      text: tForm("onboarding.codingExperienceOptions.advanced.text"),
      subText: tForm("onboarding.codingExperienceOptions.advanced.subText"),
      "data-test": "advanced-option",
    },
  ];

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="coding-experience-section">
        <Header
          variant="section"
          text={tForm("onboarding.codingExperienceTitle")}
        />
        <Box sx={{ mt: 2 }}>
          <LargeRadioButtonGroup
            data-test="coding-experience-radio-group"
            options={options}
            onChange={(id) => onSelect(Number(id) as ProductCodingExperience)}
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

export default CodingExperienceStep;

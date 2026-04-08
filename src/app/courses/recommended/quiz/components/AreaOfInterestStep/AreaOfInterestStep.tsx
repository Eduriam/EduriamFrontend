"use client";

import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  ContentContainer,
  Header,
  LargeButton,
  LargeRadioButtonGroup,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import type { ProductAreaOfInterest } from "infrastructure/api/generated/models";
import { ProductAreaOfInterest as ProductAreaOfInterestValues } from "infrastructure/api/generated/models";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface IAreaOfInterestStepProps {
  selectedId: ProductAreaOfInterest | null;
  onSelect: (id: ProductAreaOfInterest) => void;
  onContinue: () => void;
  canContinue: boolean;
}

const AreaOfInterestStep: React.FC<IAreaOfInterestStepProps> = ({
  onSelect,
  onContinue,
  canContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  const options: LargeRadioButtonOption[] = [
    {
      id: String(ProductAreaOfInterestValues.Frontend),
      text: tForm("onboarding.areaOfInterestOptions.frontend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.frontend-development.subText",
      ),
      "data-test": "frontend-development-option",
    },
    {
      id: String(ProductAreaOfInterestValues.Backend),
      text: tForm("onboarding.areaOfInterestOptions.backend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.backend-development.subText",
      ),
      "data-test": "backend-development-option",
    },
    {
      id: String(ProductAreaOfInterestValues.Fullstack),
      text: tForm("onboarding.areaOfInterestOptions.fullstack.text"),
      subText: tForm("onboarding.areaOfInterestOptions.fullstack.subText"),
      "data-test": "fullstack-option",
    },
    {
      id: String(ProductAreaOfInterestValues.Other),
      text: tForm("onboarding.areaOfInterestOptions.other.text"),
    },
  ];

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="area-of-interest-section">
        <Header
          variant="section"
          text={tForm("onboarding.areaOfInterestTitle")}
        />
        <Box sx={{ mt: 2 }}>
          <LargeRadioButtonGroup
            data-test="area-of-interest-radio-group"
            options={options}
            onChange={(id) => onSelect(Number(id) as ProductAreaOfInterest)}
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

export default AreaOfInterestStep;

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

export interface IAreaOfInterestStepProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
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
      id: "frontend-development-option",
      text: tForm("onboarding.areaOfInterestOptions.frontend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.frontend-development.subText",
      ),
      "data-test": "frontend-development-option",
    },
    {
      id: "backend-development-option",
      text: tForm("onboarding.areaOfInterestOptions.backend-development.text"),
      subText: tForm(
        "onboarding.areaOfInterestOptions.backend-development.subText",
      ),
      "data-test": "backend-development-option",
    },
    {
      id: "fullstack-option",
      text: tForm("onboarding.areaOfInterestOptions.fullstack.text"),
      subText: tForm("onboarding.areaOfInterestOptions.fullstack.subText"),
      "data-test": "fullstack-option",
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

export default AreaOfInterestStep;

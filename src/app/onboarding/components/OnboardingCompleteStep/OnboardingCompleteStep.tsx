"use client";

import { ContentContainer, Header, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface IOnboardingCompleteStepProps {
  onStartLearning: () => void;
}

const OnboardingCompleteStep: React.FC<IOnboardingCompleteStepProps> = ({
  onStartLearning,
}) => {
  const { t: tForm } = useTranslation("form");

  return (
    <ContentContainer width="small">
      <Stack spacing={3} sx={{ py: 2 }}>
        <Box data-test="onboarding-complete-section">
          <Header
            component="h1"
            text={tForm("onboarding.startLearning")}
          />
          <Box data-test="start-learning-button">
            <LargeButton onClick={onStartLearning}>
              {tForm("onboarding.startLearning")}
            </LargeButton>
          </Box>
        </Box>
      </Stack>
    </ContentContainer>
  );
};

export default OnboardingCompleteStep;

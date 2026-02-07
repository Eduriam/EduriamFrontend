"use client";

import { ContentContainer, Header, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";

export interface IOnboardingCompleteStepProps {
  onStartLearning: () => void;
}

const OnboardingCompleteStep: React.FC<IOnboardingCompleteStepProps> = ({
  onStartLearning,
}) => {
  const { t: tForm } = useTranslation("form");

  return (
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="onboarding-complete-section">
        <Header
          variant="section"
          text={tForm("onboarding.startLearning")}
        />
      </Stack>
      <LargeButton
        data-test="start-learning-button"
        onClick={onStartLearning}
        fullWidth
      >
        {tForm("onboarding.startLearning")}
      </LargeButton>
    </ContentContainer>
  );
};

export default OnboardingCompleteStep;

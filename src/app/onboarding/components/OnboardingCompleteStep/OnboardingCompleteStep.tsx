"use client";

import {
  ContentContainer,
  Header,
  Illustration,
  LargeButton,
} from "@eduriam/ui-core";
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
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Stack
          spacing={6}
          data-test="onboarding-complete-section"
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", paddingBottom: "50%" }}
        >
          <Illustration name="rocket" width={160} height={160} />
          <Header variant="section" text={tForm("onboarding.accountReady")} />
        </Stack>
      </Box>
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

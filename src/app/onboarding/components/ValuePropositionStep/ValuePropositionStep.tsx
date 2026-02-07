"use client";

import {
  ContentContainer,
  Header,
  LargeButton,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ValuePropositionListItem from "../ValuePropositionListItem";

export interface IValuePropositionStepProps {
  onContinue: () => void;
}

const ValuePropositionStep: React.FC<IValuePropositionStepProps> = ({
  onContinue,
}) => {
  const { t: tForm } = useTranslation("form");
  const { t: tCommon } = useTranslation("common");

  return (
    <ContentContainer width="small">
      <Stack spacing={3} sx={{ py: 2 }}>
        <Box data-test="value-proposition-section">
          <Header
            component="h1"
            text={tForm("onboarding.valuePropositionTitle")}
          />
          <Stack spacing={0} sx={{ mt: 2 }}>
            <ValuePropositionListItem
              title={tForm("onboarding.valuePropositionTitle")}
              illustrationName="eduriam-logo"
            />
          </Stack>
          <Box data-test="continue-button">
            <LargeButton onClick={onContinue}>
              {tCommon("navigation.continue")}
            </LargeButton>
          </Box>
        </Box>
      </Stack>
    </ContentContainer>
  );
};

export default ValuePropositionStep;

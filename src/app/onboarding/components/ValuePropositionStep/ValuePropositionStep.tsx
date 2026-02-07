"use client";

import {
  ContentContainer,
  Header,
  LargeButton,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

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
    <ContentContainer width="small" justifyContent="space-between">
      <Stack spacing={6} data-test="value-proposition-section">
        <Header
          variant="section"
          text={tForm("onboarding.valuePropositionTitle")}
        />
        <Stack spacing={0} sx={{ mt: 2 }}>
          <ValuePropositionListItem
            title={tForm("onboarding.valuePropositionTitle")}
            illustrationName="eduriam-logo"
          />
        </Stack>
      </Stack>
      <LargeButton
        data-test="continue-button"
        onClick={onContinue}
        fullWidth
      >
        {tCommon("navigation.continue")}
      </LargeButton>
    </ContentContainer>
  );
};

export default ValuePropositionStep;

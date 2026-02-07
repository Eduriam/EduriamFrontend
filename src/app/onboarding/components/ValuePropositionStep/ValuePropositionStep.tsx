"use client";

import {
  ContentContainer,
  Divider,
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
        <Stack spacing={4}>
          <ValuePropositionListItem
            title={tForm(
              "onboarding.valuePropositionItems.masterProgramming.title",
            )}
            description={tForm(
              "onboarding.valuePropositionItems.masterProgramming.description",
            )}
            illustrationName="prize"
          />
          <Divider />
          <ValuePropositionListItem
            title={tForm(
              "onboarding.valuePropositionItems.buildKnowledge.title",
            )}
            description={tForm(
              "onboarding.valuePropositionItems.buildKnowledge.description",
            )}
            illustrationName="certificate"
          />
          <Divider />
          <ValuePropositionListItem
            title={tForm(
              "onboarding.valuePropositionItems.improveEveryDay.title",
            )}
            description={tForm(
              "onboarding.valuePropositionItems.improveEveryDay.description",
            )}
            illustrationName="improvement"
          />
        </Stack>
      </Stack>
      <LargeButton data-test="continue-button" onClick={onContinue} fullWidth>
        {tCommon("navigation.continue")}
      </LargeButton>
    </ContentContainer>
  );
};

export default ValuePropositionStep;

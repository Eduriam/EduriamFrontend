import { ContentContainer, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface FreeTrialActivatedStepProps {
  onContinue: () => void;
}

const FreeTrialActivatedStep: React.FC<FreeTrialActivatedStepProps> = ({
  onContinue,
}) => {
  const { t } = useTranslation("common");

  return (
    <ContentContainer width="small" justifyContent="space-between" spacing={6}>
      <Stack
        spacing={6}
        alignItems="center"
        sx={{ width: "100%", pt: { xs: 10, md: 12 } }}
        data-test="free-trial-activated-section"
      >
        <Typography variant="h3" textAlign="center">
          {t("freeTrial.activatedTitle")}
        </Typography>
      </Stack>

      <LargeButton fullWidth data-test="continue-button" onClick={onContinue}>
        {t("userActions.continue")}
      </LargeButton>
    </ContentContainer>
  );
};

export default FreeTrialActivatedStep;

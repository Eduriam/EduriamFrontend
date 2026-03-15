import { ContentContainer, Illustration, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface FreeTrialReminderStepProps {
  onStart: () => void;
}

const FreeTrialReminderStep: React.FC<FreeTrialReminderStepProps> = ({
  onStart,
}) => {
  const { t } = useTranslation("common");

  return (
    <ContentContainer
      width="small"
      justifyContent="space-between"
      spacing={6}
      paddingTop="medium"
    >
      <Stack
        spacing={12}
        alignItems="center"
        data-test="free-trial-reminder-info-section"
      >
        <Illustration name="bell" width={128} height={128} />
        <Typography variant="h5" textAlign="center">
          {t("freeTrial.reminderTitle")}
        </Typography>
      </Stack>

      <Stack spacing={6}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
        >
          {t("freeTrial.reminderSubtitle")}
        </Typography>
        <LargeButton
          fullWidth
          data-test="start-free-trial-button"
          onClick={onStart}
        >
          {t("freeTrial.startButton")}
        </LargeButton>
      </Stack>
    </ContentContainer>
  );
};

export default FreeTrialReminderStep;

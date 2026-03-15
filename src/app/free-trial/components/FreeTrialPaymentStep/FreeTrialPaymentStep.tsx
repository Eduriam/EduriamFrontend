import { ContentContainer, LargeButton } from "@eduriam/ui-core";
import { PLAN_PRICING_OPTIONS } from "app/payment/config";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FreeTrialPaymentForm from "../FreeTrialPaymentForm/FreeTrialPaymentForm";

export interface FreeTrialPaymentStepProps {
  canConfirm: boolean;
  onFormValidityChange: (isValid: boolean) => void;
  onConfirm: () => void;
}

const FreeTrialPaymentStep: React.FC<FreeTrialPaymentStepProps> = ({
  canConfirm,
  onFormValidityChange,
  onConfirm,
}) => {
  const { t } = useTranslation("common");

  return (
    <ContentContainer width="small" justifyContent="space-between" spacing={6}>
      <Stack
        spacing={2}
        sx={{ width: "100%", pt: { xs: 10, md: 12 } }}
        data-test="subscription-payment-form-section"
      >
        <Typography variant="h4">{t("freeTrial.paymentTitle")}</Typography>

        <FreeTrialPaymentForm onValidityChange={onFormValidityChange} />

        <Typography variant="body1">
          {t("freeTrial.paymentDisclaimerPrefix")}{" "}
          <Typography component="span" variant="body1" fontWeight={700}>
            {t("freeTrial.paymentDisclaimerToday", { val: 0 })}
          </Typography>
          {t("freeTrial.paymentDisclaimerSuffix")}
          <br />
          {t("freeTrial.paymentDisclaimerAfterTrial", {
            val: PLAN_PRICING_OPTIONS.amount / 100,
          })}
        </Typography>
      </Stack>

      <LargeButton
        fullWidth
        data-test="confirm-free-trial-button"
        onClick={onConfirm}
        disabled={!canConfirm}
      >
        {t("freeTrial.startButton")}
      </LargeButton>
    </ContentContainer>
  );
};

export default FreeTrialPaymentStep;

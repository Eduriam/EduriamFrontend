import { ContentContainer, LargeButton } from "@eduriam/ui-core";
import { PLAN_PRICING_OPTIONS } from "app/payment/config";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PaymentForm from "components/molecules/forms/PaymentForm/PaymentForm";

export interface FreeTrialPaymentStepProps {
  canConfirm: boolean;
  onConfirm: () => void;
}

const FreeTrialPaymentStep: React.FC<FreeTrialPaymentStepProps> = ({
  canConfirm,
  onConfirm,
}) => {
  const { t } = useTranslation("common");

  return (
    <ContentContainer width="small" justifyContent="space-between" spacing={6}>
      <Stack spacing={8} data-test="subscription-payment-form-section">
        <Stack spacing={2}>
          <Typography variant="h4">{t("freeTrial.paymentTitle")}</Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              {t("payment.eduriamPremium")}
              {": "}
              <Typography component="span" variant="body1" fontWeight={600}>
                {t("freeTrial.paymentDuringTrial", {
                  val: 0,
                })}{" "}
              </Typography>
            </Typography>
            <Typography component="span" variant="body1">
              {t("freeTrial.paymentAfterTrial", {
                val: PLAN_PRICING_OPTIONS.amount / 100,
              })}
            </Typography>
          </Stack>
        </Stack>

        <PaymentForm />
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

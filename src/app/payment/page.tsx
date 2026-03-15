"use client";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { BasicNavbar, ContentContainer, LargeButton, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

import SubscriptionAPI from "infrastructure/api/user/subscriptions/SubscriptionsAPI";
import useAuth from "infrastructure/services/AuthProvider";

import { PAYMENT_SUCCESS_URL, PLAN_PRICING_OPTIONS } from "./config";

export interface IPaymentPage {}

const PaymentPage: React.FC<IPaymentPage> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [needInvoice, setNeedInvoice] = useState(false);

  useEffect(() => {
    if (router && user?.activeSubscription) {
      router.push("/manage-subscription");
    }
  }, [user, router]);

  function handleError(message?: string) {
    console.error(message);
    enqueueSnackbar(t("payment.generalPaymentErrorMessage"), {
      variant: "error",
    });
  }

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/premium");
  };

  // Documentation source: https://stripe.com/docs/payments/accept-a-payment-deferred?platform=web&type=subscription
  async function handleSubscribe() {
    if (!user?.id || !stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError.message);
      return;
    }

    try {
      const { type, clientSecret } = await SubscriptionAPI.createSubscription();
      if (clientSecret) {
        const confirmIntent =
          type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

        const { error: intentError } = await confirmIntent({
          elements,
          clientSecret,
          confirmParams: {
            return_url: PAYMENT_SUCCESS_URL,
          },
        });

        if (intentError) {
          handleError(intentError.message);
        }
      }
    } catch (err) {
      // Mock doesn't support Strapi subscription management
      if (err === "MOCK_NOT_SUPPORTED") {
        router.push("/subscribed");
      }
    }
  }

  return (
    <PageRoot data-test="payment-page">
      <PageNavigation
        topNavigation={<BasicNavbar
          background="transparent"
          leftButton={{
            icon: "close",
            onClick: handleClose,
            dataTest: "close-payment-button",
          }}
        />}
        mainNavigation="hidden"
      />
      <Box
        sx={{
          minHeight: "100dvh",
          backgroundImage: getPremiumBackgroundGradient(theme.palette.mode),
        }}
      >

        <ContentContainer width="small" justifyContent="space-between" spacing={4}>
          <Stack spacing={4} sx={{ width: "100%", pt: { xs: 10, md: 12 } }}>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h6">{t("payment.monthlySubscription")}</Typography>
              <Typography variant="h5">{`${t("payment.perMonth", {
                val: PLAN_PRICING_OPTIONS.amount / 100,
              })}`}</Typography>
            </Stack>

            <Box sx={{ width: "100%" }} data-test="subscription-payment-form-section">
              <PaymentElement />
              <Typography
                variant="caption"
                sx={{ mt: 1, color: "text.secondary", lineHeight: 1.45, display: "block" }}
              >
                {t("payment.subscriptionDisclaimer")}
              </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
              <FormControlLabel
                label={t("payment.iWantToReceiveInvoice")}
                control={
                  <Checkbox
                    checked={needInvoice}
                    onChange={(event) => setNeedInvoice(event.target.checked)}
                  />
                }
              />
              {needInvoice && <AddressElement options={{ mode: "billing" }} />}
            </Box>
          </Stack>

          <LargeButton fullWidth onClick={() => void handleSubscribe()} data-test="subscribe-now-button">
            {t("payment.buySubscription")}
          </LargeButton>
        </ContentContainer>
      </Box>
    </PageRoot>
  );
};

export default PaymentPage;

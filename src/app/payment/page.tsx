"use client";

import {
  BasicNavbar,
  ContentContainer,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import PaymentForm from "components/molecules/forms/PaymentForm/PaymentForm";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

import { SubscriptionsService } from "infrastructure/services/users/SubscriptionsService";
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
      const { type, clientSecret } =
        await SubscriptionsService.createSubscription();
      if (clientSecret) {
        const { error: intentError } =
          type === "setup"
            ? await stripe.confirmSetup({
                elements,
                clientSecret,
                confirmParams: {
                  return_url: PAYMENT_SUCCESS_URL,
                },
              })
            : await stripe.confirmPayment({
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
      <Stack
        sx={{
          minHeight: "100dvh",
          backgroundImage: getPremiumBackgroundGradient(theme.palette.mode),
        }}
      >
        <PageNavigation
          topNavigation={
            <BasicNavbar
              background="transparent"
              leftButton={{
                icon: "close",
                onClick: handleClose,
                dataTest: "close-payment-button",
              }}
            />
          }
          mainNavigation="hidden"
        />

        <ContentContainer
          width="small"
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={8} sx={{ width: "100%" }}>
            <Stack spacing={3}>
              <Typography variant="h4">
                {t("payment.monthlySubscription")}
              </Typography>
              <Typography variant="body1">
                {t("payment.eduriamPremium")}
                {": "}
                <Typography component="span" variant="body1" fontWeight={600}>
                  {`${t("payment.perMonth", {
                    val: PLAN_PRICING_OPTIONS.amount / 100,
                  })}`}
                </Typography>
              </Typography>
            </Stack>

            <Box
              sx={{ width: "100%" }}
              data-test="subscription-payment-form-section"
            >
              <PaymentForm />
            </Box>
          </Stack>

          <LargeButton
            fullWidth
            onClick={() => void handleSubscribe()}
            data-test="subscribe-now-button"
          >
            {t("payment.buySubscription")}
          </LargeButton>
        </ContentContainer>
      </Stack>
    </PageRoot>
  );
};

export default PaymentPage;

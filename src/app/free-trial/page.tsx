"use client";

import { BasicNavbar, PageRoot } from "@eduriam/ui-core";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";
import { getPremiumBackgroundGradient } from "components/premium/premiumBackground";

import { SubscriptionStatus, UserRole } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import { SubscriptionsService } from "infrastructure/services/users/SubscriptionsService";

import FreeTrialActivatedStep from "./components/FreeTrialActivatedStep/FreeTrialActivatedStep";
import FreeTrialPaymentStep from "./components/FreeTrialPaymentStep/FreeTrialPaymentStep";
import FreeTrialReminderStep from "./components/FreeTrialReminderStep/FreeTrialReminderStep";

export interface IFreeTrialPage {}

type FreeTrialStep = "reminder" | "payment" | "activated";

const TRIAL_DURATION_DAYS = 7;

const FreeTrialPage: React.FC<IFreeTrialPage> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation("common");
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateUser } = useAuth();

  const [step, setStep] = useState<FreeTrialStep>("reminder");
  const [isActivating, setIsActivating] = useState(false);

  const canConfirmFreeTrial = useMemo(() => !isActivating, [isActivating]);

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

    router.push("/");
  };

  const handleConfirmFreeTrial = async () => {
    if (!canConfirmFreeTrial) {
      return;
    }

    setIsActivating(true);

    try {
      const { type, clientSecret } = await SubscriptionsService.startFreeTrial();
      if (clientSecret) {
        if (!stripe || !elements) {
          return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
          handleError(submitError.message);
          return;
        }

        const { error: intentError } =
          type === "setup"
            ? await stripe.confirmSetup({
                elements,
                clientSecret,
                confirmParams: {
                  return_url: window.location.href,
                },
                redirect: "if_required",
              })
            : await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                  return_url: window.location.href,
                },
                redirect: "if_required",
              });

        if (intentError) {
          handleError(intentError.message);
          return;
        }
      }

      mutateUser({
        role: UserRole.PremiumUser,
        activeSubscription: {
          status: SubscriptionStatus.Trialing,
          periodStart: new Date().toISOString(),
          periodEnd: new Date(
            Date.now() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      });

      setStep("activated");
    } catch (error) {
      handleError(typeof error === "string" ? error : undefined);
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <PageRoot data-test="free-trial-page">
      <Stack
        sx={{
          backgroundImage: getPremiumBackgroundGradient(theme.palette.mode),
          minHeight: "100dvh",
        }}
      >
        <PageNavigation
          topNavigation={
            <BasicNavbar
              background="transparent"
              leftButton={{
                icon: "close",
                onClick: handleClose,
                dataTest: "close-free-trial-button",
              }}
            />
          }
          mainNavigation="hidden"
        />

        {step === "reminder" ? (
          <FreeTrialReminderStep onStart={() => setStep("payment")} />
        ) : null}

        {step === "payment" ? (
          <FreeTrialPaymentStep
            canConfirm={canConfirmFreeTrial}
            onConfirm={() => {
              void handleConfirmFreeTrial();
            }}
          />
        ) : null}

        {step === "activated" ? (
          <FreeTrialActivatedStep onContinue={() => router.push("/")} />
        ) : null}
      </Stack>
    </PageRoot>
  );
};

export default FreeTrialPage;

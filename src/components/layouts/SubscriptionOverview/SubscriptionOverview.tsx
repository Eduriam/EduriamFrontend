import type { LargeRadioButtonOption } from "@eduriam/ui-core";
import {
  Card,
  Header,
  Illustration,
  LargeButton,
  LargeRadioButtonGroup,
  Paragraph,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { optimisticMutationOption } from "infrastructure/api/API";
import { Subscription } from "infrastructure/api/user/subscriptions/Subscriptions";
import SubscriptionAPI from "infrastructure/api/user/subscriptions/SubscriptionsAPI";

export interface ISubscriptionOverview {}

const UNSUBSCRIBE_REASON_INDICES = [0, 1, 2, 3] as const;

const SubscriptionOverview: React.FC<ISubscriptionOverview> = () => {
  const [selectedReasonId, setSelectedReasonId] = useState<string | undefined>();
  const { t } = useTranslation("common");
  const [page, setPage] = useState(0);
  const navigateWithTransition = useTransitionNavigationHandler();

  const { subscription, mutate } = SubscriptionAPI.useSubscription();

  const unsubscribeOptions: LargeRadioButtonOption[] = useMemo(
    () =>
      UNSUBSCRIBE_REASON_INDICES.map((index) => ({
        id: String(index),
        text: t(`manageSubscription.unsubscribeReasons.${index}`),
        "data-test": `unsubscribe-reason-${index}`,
      })),
    [t],
  );

  const nextPaymentDate = useMemo(() => {
    if (!subscription?.currentPeriodEnd) {
      return "";
    }

    return new Intl.DateTimeFormat("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(subscription.currentPeriodEnd));
  }, [subscription?.currentPeriodEnd]);

  function handleUnsubscribe() {
    if (!subscription) {
      return;
    }

    const data: Subscription = {
      ...subscription,
      status: "SCHEDULED_TO_CANCEL",
    };

    mutate(
      SubscriptionAPI.cancelSubscription({
        unsubscribeReason:
          selectedReasonId !== undefined
            ? t(`manageSubscription.unsubscribeReasons.${selectedReasonId}`)
            : "",
      }),
      optimisticMutationOption(data),
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100dvh - 128px)",
      }}
    >
      {subscription && (
        <>
          {page === 0 ? (
            <Stack
              sx={{
                width: "100%",
                alignItems: "stretch",
                pt: 5,
                gap: 1,
              }}
            >
              <Card paddingX="medium" paddingY="medium">
                <Stack spacing={1}>
                  <Header
                    variant="subsection"
                    text={t("navigation.premium")}
                    align="left"
                  />
                  <Typography variant="body1" color="text.secondary">
                    {`${t("manageSubscription.subscriptionState")}: ${t(
                      `manageSubscription.subscriptionStates.${subscription.status.toLowerCase()}`,
                    )}`}
                    <br />
                    {`${t("manageSubscription.nextPayment")}: ${nextPaymentDate}`}
                  </Typography>
                </Stack>
              </Card>
              <LargeButton
                variant="text"
                onClick={() => setPage(1)}
                data-test="cancel-subscription-button"
              >
                {t("manageSubscription.cancel")}
              </LargeButton>
            </Stack>
          ) : page === 1 ? (
            <Stack
              sx={{
                width: "100%",
                minHeight: "calc(100dvh - 128px)",
                justifyContent: "space-between",
                pt: 9,
                pb: 2,
              }}
            >
              <Stack spacing={6}>
                <Typography variant="h5" align="center">
                  {t("manageSubscription.whyUnsubscribeTitle")}
                </Typography>
                <LargeRadioButtonGroup
                  options={unsubscribeOptions}
                  onChange={setSelectedReasonId}
                  fullWidth
                />
              </Stack>

              <LargeButton
                onClick={() => setPage(2)}
                disabled={selectedReasonId === undefined}
                data-test="continue-cancellation-flow-button"
              >
                {t("manageSubscription.continue")}
              </LargeButton>
            </Stack>
          ) : page === 2 ? (
            <Stack
              sx={{
                width: "100%",
                minHeight: "calc(100dvh - 128px)",
                justifyContent: "space-between",
                pt: 11,
                pb: 2,
              }}
            >
              <Stack spacing={8} alignItems="center">
                <Illustration name="sadFace" width={128} height={128} />
                <Stack spacing={4} alignItems="center" sx={{ maxWidth: 333 }}>
                  <Typography variant="h5" align="center">
                    {t("manageSubscription.confirmCancellationTitle")}
                  </Typography>
                  <Paragraph
                    text={t("manageSubscription.cancellationWarning")}
                    align="center"
                  />
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <LargeButton
                  onClick={navigateWithTransition("/")}
                  data-test="keep-premium-button"
                >
                  {t("manageSubscription.keepPremium")}
                </LargeButton>
                <LargeButton
                  variant="text"
                  color="error"
                  onClick={() => {
                    setPage(3);
                    handleUnsubscribe();
                  }}
                  data-test="confirm-cancellation-button"
                >
                  {t("manageSubscription.confirmCancellation")}
                </LargeButton>
              </Stack>
            </Stack>
          ) : (
            <Stack
              sx={{
                width: "100%",
                minHeight: "calc(100dvh - 128px)",
                justifyContent: "space-between",
                pt: 9,
                pb: 2,
              }}
            >
              <Typography variant="h5" align="center">
                {t("manageSubscription.successfullyUnsubscibed")}
              </Typography>

              <LargeButton onClick={navigateWithTransition("/")}>
                {t("navigation.continue")}
              </LargeButton>
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default SubscriptionOverview;

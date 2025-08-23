import { useTranslation } from "i18n/client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import MultipleChoiceCardList from "components/atoms/lists/MultipleChoiceCardList/MultipleChoiceCardList";

import { optimisticMutationOption } from "infrastructure/api/API";
import { Subscription } from "infrastructure/api/user/subscriptions/Subscriptions";
import SubscriptionAPI from "infrastructure/api/user/subscriptions/SubscriptionsAPI";

import common from "../../../../public/locales/cs/common.json";

export interface ISubscriptionOverview {}

const SubscriptionOverview: React.FC<ISubscriptionOverview> = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  );
  const { t } = useTranslation("common");
  const [page, setPage] = useState(0);
  const router = useRouter();

  const { subscription, mutate } = SubscriptionAPI.useSubscription();

  function handleUnsubscribe() {
    const data: Subscription = {
      ...subscription,
      status: "SCHEDULED_TO_CANCEL",
    };

    mutate(
      SubscriptionAPI.cancelSubscription({
        unsubscribeReason: selectedIndex
          ? common.manageSubscription.unsubscribeReasons[selectedIndex]
          : "",
      }),
      optimisticMutationOption(data),
    );
  }

  return (
    <Box sx={{ minWidth: "80%" }}>
      {subscription && (
        <>
          {page === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    {t("manageSubscription.current")}
                  </Typography>
                  <Typography>
                    {`${t("manageSubscription.subscriptionState")}: ${t(
                      `manageSubscription.subscriptionStates.${subscription.status.toLowerCase()}`,
                    )}`}
                  </Typography>
                  <Typography>
                    {`${t("manageSubscription.nextPayment")}: ${new Date(
                      subscription.currentPeriodEnd,
                    ).toLocaleDateString()}`}
                  </Typography>
                </CardContent>
              </Card>
              <Button onClick={() => setPage(1)}>
                {t("manageSubscription.cancel")}
              </Button>
            </Box>
          ) : page === 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="subtitle1">
                {t("manageSubscription.whyUnsubscribe")}
              </Typography>
              <MultipleChoiceCardList
                selectedIndex={selectedIndex}
                choices={common.manageSubscription.unsubscribeReasons.map(
                  (reason) => {
                    return {
                      name: reason,
                    };
                  },
                )}
                onChange={(index) => setSelectedIndex(index)}
              />

              <Button
                onClick={() => setPage(2)}
                variant="contained"
                sx={{ alignSelf: "center" }}
                disabled={selectedIndex === undefined}
              >
                {t("manageSubscription.continue")}
              </Button>
            </Box>
          ) : page === 2 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle1">
                  {t("manageSubscription.youWontHaveAccessToThese")}
                </Typography>
                <ul>
                  {common.manageSubscription.premiumFeatures.map((_, i) => {
                    return (
                      <li key={i}>
                        <Typography>
                          {t(`manageSubscription.premiumFeatures.${i}`)}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
              <Button onClick={() => router.push("/")} variant="contained">
                {t("manageSubscription.keepPremium")}
              </Button>
              <Button
                onClick={() => {
                  setPage(3);
                  handleUnsubscribe();
                }}
              >
                {t("manageSubscription.confirmCancellation")}
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                gap: 16,
              }}
            >
              <Typography variant="subtitle1">
                {t("manageSubscription.successfullyUnsubscibed")}
              </Typography>
              <Button onClick={() => router.push("/")} variant="contained">
                {t("navigation.home")}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SubscriptionOverview;

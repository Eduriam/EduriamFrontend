"use client";

import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import useAuth from "infrastructure/services/AuthProvider";

export interface ISubscriptionPage {}

const FEATURES_LIST_LENGTH = 4;

const SubscriptionPage: React.FC<ISubscriptionPage> = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const imgWidth = desktop ? 275 : 200;
  const imgHeight = desktop ? 182 : 133;
  const imgBoxWidth = imgWidth + 25;

  function listFeatures() {
    const markup = [];

    for (let i = 0; i < FEATURES_LIST_LENGTH; i++) {
      markup.push(
        <ListItem sx={{ display: "list-item" }} key={i}>
          {t(`subscription.subscribedFeatures.${i}`)}
        </ListItem>,
      );
    }

    return markup;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {user?.activeSubscription ? (
        <>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {t("subscription.subscribedHeader")}
          </Typography>

          <Box>
            <Image
              src={"/images/subscription/premium_1.svg"}
              alt="Premium account"
              width={400}
              height={265}
            />
          </Box>

          <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 2 }}>
            {`${t("subscription.subscribedFeaturesHeader")}:`}
          </Typography>

          <List sx={{ listStyleType: "disc", pl: 4 }}>{listFeatures()}</List>

          <Button
            onClick={() => router.push("/manage-subscription")}
            variant="contained"
            sx={{ my: 2 }}
          >
            {t("subscription.manageSubscription")}
          </Button>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            width: "100%",
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {t("subscription.subscriptionHeader")}
          </Typography>

          <Box>
            <Image
              src={"/images/subscription/premium_1.svg"}
              alt="Premium account"
              width={400}
              height={265}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            sx={{ width: "90%", gap: 2, mt: 4 }}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("subscription.valuePropositions.0")}
              </Typography>
              <Box sx={{ width: `${imgBoxWidth}px` }}>
                <Image
                  src={"/images/subscription/premium_2.svg"}
                  alt="Advanced vocabulary."
                  width={imgWidth}
                  height={imgHeight}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Box sx={{ width: `${imgBoxWidth}px` }}>
                <Image
                  src={"/images/subscription/premium_3.svg"}
                  alt="Create your own lessons."
                  width={imgWidth}
                  height={imgHeight}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("subscription.valuePropositions.1")}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("subscription.valuePropositions.2")}
              </Typography>
              <Box sx={{ width: `${imgBoxWidth}px` }}>
                <Image
                  src={"/images/subscription/premium_4.svg"}
                  alt="Advanced exercises."
                  width={imgWidth}
                  height={imgHeight}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            >
              <Box sx={{ width: `${imgBoxWidth}px` }}>
                <Image
                  src={"/images/subscription/premium_5.svg"}
                  alt="No ads"
                  width={imgWidth}
                  height={imgHeight}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("subscription.valuePropositions.3")}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={() => router.push("/payment")}
            variant="contained"
            size="large"
            sx={{ my: 2 }}
          >
            {t("subscription.getSubscription")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionPage;

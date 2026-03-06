"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BackNavigationBar from "components/atoms/navigation/top-navigation-bars/BackNavigationBar/BackNavigationBar";
import SubscriptionOverview from "components/layouts/SubscriptionOverview/SubscriptionOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IManageSubscriptionPage {}

const ManageSubscriptionPage: React.FC<IManageSubscriptionPage> = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");

  return (
    <PageRoot data-test="manage-subscription-page">
      <BackNavigationBar header="manageSubscription" />;
      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        {user && user.activeSubscription ? (
          <SubscriptionOverview />
        ) : (
          <Stack
            sx={{
              width: "100%",
              minHeight: "calc(100dvh - 128px)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" align="center">
              {t("manageSubscription.notSubscribed")}
            </Typography>
          </Stack>
        )}
      </ContentContainer>
    </PageRoot>
  );
};

export default ManageSubscriptionPage;

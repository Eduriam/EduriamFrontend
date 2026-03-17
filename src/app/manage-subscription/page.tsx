"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SubscriptionOverview from "components/layouts/SubscriptionOverview/SubscriptionOverview";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import useAuth from "infrastructure/services/AuthProvider";

export interface IManageSubscriptionPage {}

const ManageSubscriptionPage: React.FC<IManageSubscriptionPage> = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <PageRoot data-test="manage-subscription-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            header={t("manageSubscription.title")}
            leftButton={{
              icon: "arrowLeft",
              onClick: () => router.back(),
            }}
          />
        }
        mainNavigation="hidden"
      />
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

"use client";

import { useTranslation } from "i18n/client";

import Typography from "@mui/material/Typography";

import SubscriptionOverview from "components/layouts/SubscriptionOverview/SubscriptionOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IManageSubscriptionPage {}

const ManageSubscriptionPage: React.FC<IManageSubscriptionPage> = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");

  return (
    <>
      {user && user.activeSubscription ? (
        <SubscriptionOverview />
      ) : (
        <Typography variant="body1">
          {t("manageSubscription.notSubscribed")}
        </Typography>
      )}
    </>
  );
};

export default ManageSubscriptionPage;

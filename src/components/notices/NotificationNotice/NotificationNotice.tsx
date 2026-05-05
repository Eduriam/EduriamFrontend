import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import PushNotificationService from "infrastructure/services/notifications/PushNotificationService";

export interface NotificationNoticeProps {
  onDismiss: () => void;
  onEnabled: () => void;
}

const NotificationNotice: React.FC<NotificationNoticeProps> = ({
  onDismiss,
  onEnabled,
}) => {
  const { t } = useTranslation("common");
  const [isEnabling, setIsEnabling] = useState(false);

  const handleEnable = async () => {
    setIsEnabling(true);

    const result = await PushNotificationService.enablePushNotifications();

    setIsEnabling(false);

    if (
      result === "registered" ||
      result === "permission-granted" ||
      result === "missing-config" ||
      result === "token-unavailable" ||
      result === "registration-failed"
    ) {
      onEnabled();
    }
  };

  const handleDismiss = () => {
    PushNotificationService.dismissNotificationNotice();
    onDismiss();
  };

  return (
    <NoticeDialog
      data-test="enable-notifications-notice"
      primaryButton={{
        onClick: () => {
          void handleEnable();
        },
        text: t("notices.enableNotifications.turnOn"),
        dataTest: "enable-push-notifications-button",
        disabled: isEnabling,
      }}
      secondaryButton={{
        onClick: handleDismiss,
        text: t("notices.enableNotifications.notNow"),
        dataTest: "continue-button",
        disabled: isEnabling,
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ width: "100%", mt: 8 }}
      >
        <Illustration name="bell" width={128} height={128} />
        <Typography variant="h5" textAlign="center">
          {t("notices.enableNotifications.title")}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default NotificationNotice;

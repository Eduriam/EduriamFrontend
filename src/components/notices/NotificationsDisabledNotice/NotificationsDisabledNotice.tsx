import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { NotificationsDisabledNotice as NotificationsDisabledNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface NotificationsDisabledNoticeProps {
  notice: NotificationsDisabledNoticeType;
}

const NotificationsDisabledNotice: React.FC<NotificationsDisabledNoticeProps> = ({
  notice,
}) => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { markNoticeAsRead } = useNotices();

  const navigateToNotificationSettings = navigateWithTransition(
    "/settings/notifications",
  );

  const handleTurnOn = async () => {
    await markNoticeAsRead(notice.id);
    navigateToNotificationSettings();
  };

  return (
    <NoticeDialog
      data-test="notifications-disabled-notice"
      primaryButton={{
        onClick: () => {
          void handleTurnOn();
        },
        text: t("notices.turnOnNotifications"),
        dataTest: "turn-on-notifications-button",
      }}
      secondaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("notices.notNow"),
        dataTest: "not-now-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={8} alignItems="center" sx={{ width: "100%", mt: 8 }}>
        <Illustration name="bell" width={128} height={128} />
        <Typography variant="h5" textAlign="center">
          {t("notices.notificationsMotivation")}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default NotificationsDisabledNotice;



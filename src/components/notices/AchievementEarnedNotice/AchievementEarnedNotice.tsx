import AchievementBadge from "app/users/[userId]/components/AchievementBadge/AchievementBadge";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { AchievementEarnedNotice as AchievementEarnedNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface AchievementEarnedNoticeProps {
  notice: AchievementEarnedNoticeType;
}

const AchievementEarnedNotice: React.FC<AchievementEarnedNoticeProps> = ({
  notice,
}) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  return (
    <NoticeDialog
      data-test="achievement-earned-notice"
      primaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={2} alignItems="center" sx={{ width: "100%", mt: 8 }}>
        <Typography variant="h5" textAlign="center">
          {t("notices.achievementEarned")}
        </Typography>

        <AchievementBadge badgeIconName={notice.badgeIconName} />

        <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h6" textAlign="center">
            {notice.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 199 }}
          >
            {notice.description}
          </Typography>
        </Stack>
      </Stack>
    </NoticeDialog>
  );
};

export default AchievementEarnedNotice;

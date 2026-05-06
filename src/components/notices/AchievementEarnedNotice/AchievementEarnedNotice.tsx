import AchievementBadge from "app/users/[userId]/components/AchievementBadge/AchievementBadge";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { AchievementEarnedNoticeModel } from "infrastructure/api/generated/models";
import useNotices from "infrastructure/services/NoticeProvider";

export interface AchievementEarnedNoticeProps {
  notice: AchievementEarnedNoticeModel;
}

const AchievementEarnedNotice: React.FC<AchievementEarnedNoticeProps> = ({
  notice,
}) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();
  const badgeIconName =
    notice.badgeIconName === "achievement-2"
      ? "achievement-2"
      : "achievement-1";

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
      paddingTop="medium"
    >
      <Stack spacing={8} alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h5" textAlign="center">
          {t("notices.achievementEarned")}
        </Typography>

        <AchievementBadge badgeIconName={badgeIconName} size="large" />

        <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h6" textAlign="center">
            {notice.title ?? t("notices.achievementEarned")}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            textAlign="center"
          >
            {notice.description ?? ""}
          </Typography>
        </Stack>
      </Stack>
    </NoticeDialog>
  );
};

export default AchievementEarnedNotice;

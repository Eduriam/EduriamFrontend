import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { StreakSavedNoticeModel } from "infrastructure/api/generated/models";
import useNotices from "infrastructure/services/NoticeProvider";

export interface StreakSavedNoticeProps {
  notice: StreakSavedNoticeModel;
}

const StreakSavedNotice: React.FC<StreakSavedNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  return (
    <NoticeDialog
      data-test="streak-saved-notice"
      primaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={3.5} alignItems="center" sx={{ width: "100%", mt: 8 }}>
        <Stack spacing={2} alignItems="center">
          <Illustration name="streakFreeze" width={128} height={128} />
          <Typography variant="h2" textAlign="center" lineHeight="58px">
            {notice.streakDays ?? 0}
          </Typography>
          <Typography variant="h5" textAlign="center">
            {t("notices.streakSaved")}
          </Typography>
        </Stack>

        <Typography variant="body1" textAlign="center" sx={{ maxWidth: 273 }}>
          {t("notices.streakSavedDescription", {
            freezesLeft: notice.freezesLeft ?? 0,
          })}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default StreakSavedNotice;



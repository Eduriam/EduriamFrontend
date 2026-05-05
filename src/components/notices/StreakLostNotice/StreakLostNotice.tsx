import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { StreakLostNoticeModel } from "infrastructure/api/generated/models";
import useNotices from "infrastructure/services/NoticeProvider";

export interface StreakLostNoticeProps {
  notice: StreakLostNoticeModel;
}

const StreakLostNotice: React.FC<StreakLostNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  return (
    <NoticeDialog
      data-test="streak-lost-notice"
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
        <Illustration name="fireDisabled" width={128} height={128} />
        <Typography variant="h2" textAlign="center" lineHeight="58px">
          0
        </Typography>
        <Typography variant="h5" textAlign="center">
          {t("notices.streakLost")}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default StreakLostNotice;



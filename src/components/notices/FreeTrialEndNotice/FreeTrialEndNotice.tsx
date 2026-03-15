import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { FreeTrialEndNotice as FreeTrialEndNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface FreeTrialEndNoticeProps {
  notice: FreeTrialEndNoticeType;
}

const FreeTrialEndNotice: React.FC<FreeTrialEndNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  const reminderDays = notice.daysLeft ?? 3;

  return (
    <NoticeDialog
      data-test="free-trial-end-notice"
      primaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack
        spacing={6}
        alignItems="center"
        sx={{
          width: "100%",
          mt: 8,
          p: 2,
          borderRadius: 4,
        }}
        data-test="free-trial-end-notice-section"
      >
        <Illustration name="bell" width={128} height={128} />
        <Typography variant="h5" textAlign="center">
          {t("freeTrial.endNoticeReminder", { days: reminderDays })}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default FreeTrialEndNotice;

import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";

import type { AdvertisementNotice as AdvertisementNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface AdvertisementNoticeProps {
  notice: AdvertisementNoticeType;
}

const AdvertisementNotice: React.FC<AdvertisementNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  return (
    <NoticeDialog
      data-test="advertisement-notice"
      primaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={1.5} alignItems="center" sx={{ width: "100%", mt: 6 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 320,
            height: 320,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {t("notices.advertisement")}
          </Typography>
        </Stack>

        <Typography variant="body1" color="text.secondary" textAlign="center">
          {notice.message}
        </Typography>
      </Stack>
    </NoticeDialog>
  );
};

export default AdvertisementNotice;



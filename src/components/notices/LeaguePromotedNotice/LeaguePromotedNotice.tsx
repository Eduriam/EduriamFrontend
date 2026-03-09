import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";
import LeagueIcon from "components/leaderboard/LeagueIcon";

import type { LeaguePromotedNotice as LeaguePromotedNoticeType } from "infrastructure/api/users/me/notices/Notices";
import useNotices from "infrastructure/services/NoticeProvider";

export interface LeaguePromotedNoticeProps {
  notice: LeaguePromotedNoticeType;
}

const LeaguePromotedNotice: React.FC<LeaguePromotedNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();

  return (
    <NoticeDialog
      data-test="league-promoted-notice"
      primaryButton={{
        onClick: () => {
          void markNoticeAsRead(notice.id);
        },
        text: t("userActions.continue"),
        dataTest: "continue-button",
      }}
      transitionDuration={{ appear: 0, enter: 0, exit: 0 }}
    >
      <Stack spacing={8} alignItems="center" sx={{ width: "100%", mt: 8 }}>
        <Typography variant="h5" textAlign="center">
          {t("notices.leaguePromoted")}
        </Typography>

        <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
          <LeagueIcon variant={notice.league} size={160} />
          <Typography variant="h5" color="text.secondary" textAlign="center">
            {t(`leaderboard.leagues.${notice.league}`)} {t("leaderboard.league")}
          </Typography>
        </Stack>
      </Stack>
    </NoticeDialog>
  );
};

export default LeaguePromotedNotice;



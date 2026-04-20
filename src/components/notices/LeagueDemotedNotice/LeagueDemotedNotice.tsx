import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeDialog from "components/notices/NoticeDialog/NoticeDialog";
import LeagueIcon from "components/leaderboard/LeagueIcon";
import type { LeagueIconVariant } from "components/leaderboard/LeagueIcon";

import {
  LeagueType,
  type LeagueDemotedNoticeModel,
} from "infrastructure/api/generated/models";
import useNotices from "infrastructure/services/NoticeProvider";

export interface LeagueDemotedNoticeProps {
  notice: LeagueDemotedNoticeModel;
}

const leagueTranslationMap: Record<LeagueType, LeagueIconVariant> = {
  [LeagueType.Iron]: "iron",
  [LeagueType.Bronze]: "bronze",
  [LeagueType.Silver]: "silver",
  [LeagueType.Gold]: "gold",
  [LeagueType.Platinum]: "platinum",
  [LeagueType.Emerald]: "emerald",
  [LeagueType.Ruby]: "ruby",
  [LeagueType.Sapphire]: "sapphire",
  [LeagueType.Diamond]: "diamond",
  [LeagueType.Mythic]: "mythic",
};

const LeagueDemotedNotice: React.FC<LeagueDemotedNoticeProps> = ({ notice }) => {
  const { t } = useTranslation("common");
  const { markNoticeAsRead } = useNotices();
  const league = leagueTranslationMap[notice.league ?? LeagueType.Iron] ?? "iron";

  return (
    <NoticeDialog
      data-test="league-demoted-notice"
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
          {t("notices.leagueDemoted")}
        </Typography>

        <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
          <LeagueIcon variant={league} size={160} />
          <Typography variant="h5" color="text.secondary" textAlign="center">
            {t(`leaderboard.leagues.${league}`)} {t("leaderboard.league")}
          </Typography>
        </Stack>
      </Stack>
    </NoticeDialog>
  );
};

export default LeagueDemotedNotice;



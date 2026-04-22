"use client";

import { Card } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LeagueIcon, {
  type LeagueIconVariant,
} from "components/leaderboard/LeagueIcon";
import { toLeagueVariant } from "components/leaderboard/leagueType";

import type { LeagueType } from "infrastructure/api/generated/models";

export interface ILeagueCard {
  league?: LeagueType | null;
}

const LeagueCard: React.FC<ILeagueCard> = ({ league }) => {
  const { t } = useTranslation("common");
  const safeLeague: LeagueIconVariant = toLeagueVariant(league);

  return (
    <Card paddingX="medium" paddingY="small">
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <LeagueIcon variant={safeLeague} size="small" />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" fontWeight="bold">
            {t(`leaderboard.leagues.${safeLeague}`)}
          </Typography>
          <Typography variant="body2">{t("leaderboard.league")}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default LeagueCard;

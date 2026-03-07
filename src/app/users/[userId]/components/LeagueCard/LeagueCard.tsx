"use client";

import { Card } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LeagueIcon, {
  type LeagueIconVariant,
} from "components/leaderboard/LeagueIcon";

export interface ILeagueCard {
  league?: LeagueIconVariant | string | null;
}

const LEAGUE_VARIANTS: LeagueIconVariant[] = [
  "empty",
  "locked",
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "emerald",
  "ruby",
  "sapphire",
  "diamond",
  "mythic",
];

const LeagueCard: React.FC<ILeagueCard> = ({ league }) => {
  const { t } = useTranslation("common");
  const normalizedLeague = typeof league === "string" ? league.toLowerCase() : "";
  const safeLeague: LeagueIconVariant = LEAGUE_VARIANTS.includes(
    normalizedLeague as LeagueIconVariant,
  )
    ? (normalizedLeague as LeagueIconVariant)
    : "locked";

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

"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { toRankedLeagueVariant } from "components/leaderboard/leagueType";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import useAuth from "infrastructure/services/AuthProvider";
import { LeaderboardService } from "infrastructure/services/users/LeaderboardService";

import LeaderboardComponent from "./components/Leaderboard/Leaderboard";
import LeaguesShelf from "./components/LeaguesShelf/LeaguesShelf";

function formatIsoDuration(duration: string | undefined): string {
  if (!duration || !duration.startsWith("P")) {
    return "0m";
  }

  const match = duration.match(
    /^P(?:\d+Y)?(?:\d+M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(?:\d+(?:\.\d+)?)S)?)?$/,
  );
  if (!match) {
    return duration;
  }

  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  const parts = [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : "0m";
}

function getPromotionEndIndex(
  promotionZoneEndIndex: number | undefined,
  userCount: number,
): number {
  if (promotionZoneEndIndex === undefined || promotionZoneEndIndex < 0) {
    return 0;
  }

  return Math.min(promotionZoneEndIndex + 1, userCount);
}

function getNeutralEndIndex(
  demotionZoneStartIndex: number | undefined,
  userCount: number,
  promotionEndIndex: number,
): number {
  if (demotionZoneStartIndex === undefined || demotionZoneStartIndex < 0) {
    return userCount;
  }

  return Math.max(
    promotionEndIndex,
    Math.min(demotionZoneStartIndex, userCount),
  );
}

const LeaderboardPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { leaderboard } = LeaderboardService.useLeaderboard();
  const { user } = useAuth();

  const currentLeague =
    toRankedLeagueVariant(leaderboard?.currentLeague) ??
    toRankedLeagueVariant(user?.league) ??
    null;
  const hasStartedWeek = (leaderboard?.users.length ?? 0) > 0;

  const users =
    leaderboard?.users.map((entry) => ({
      id: /^\d+$/.test(entry.id) ? Number(entry.id) : entry.id,
      rank: entry.rank,
      name: entry.name,
      xp: entry.xp,
      avatar: entry.avatarDefinition,
    })) ?? [];

  const currentLeagueName = t(
    `leaderboard.leagues.${currentLeague ?? "empty"}`,
  );
  const navbarHeader = hasStartedWeek
    ? `${currentLeagueName} ${t("leaderboard.league")}`
    : t("leaderboard.leaguesLabel");

  const promotionZoneEndIndex = getPromotionEndIndex(
    leaderboard?.zones?.promotionZoneEndIndex,
    users.length,
  );
  const demotionZoneStartIndex = getNeutralEndIndex(
    leaderboard?.zones?.demotionZoneStartIndex,
    users.length,
    promotionZoneEndIndex,
  );

  return (
    <PageRoot data-test="leaderboard-page">
      <PageNavigation
        topNavigation={<BasicNavbar header={navbarHeader} />}
        mainNavigation="show"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack direction="column" spacing={7} width="100%">
          <LeaguesShelf currentLeague={currentLeague} />

          {hasStartedWeek ? (
            <Stack
              data-test="leaderboard-section"
              sx={{ width: "100%" }}
              spacing={4}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t("leaderboard.title")}
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  data-test="time-left-section"
                >
                  <AccessTimeOutlinedIcon
                    sx={{ color: "text.secondary", fontSize: 24 }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {formatIsoDuration(leaderboard?.timeLeft)}
                  </Typography>
                </Stack>
              </Stack>

              <Box data-test="leaderboard-users-section" sx={{ width: "100%" }}>
                <LeaderboardComponent
                  users={users}
                  promotionEndIndex={promotionZoneEndIndex}
                  neutralEndIndex={demotionZoneStartIndex}
                  promotionLabel={t("leaderboard.promotionZone")}
                  neutralLabel=""
                  demotionLabel={t("leaderboard.demotionZone")}
                  currentUserId={user?.id ?? undefined}
                  currentUserDataTest="current-user-leaderboard-section"
                />
              </Box>
            </Stack>
          ) : (
            <Box
              data-test="complete-lesson-or-review-section"
              sx={{
                width: "100%",
                minHeight: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 280 }}
              >
                {t("leaderboard.notStartedMessage")}
              </Typography>
            </Box>
          )}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default LeaderboardPage;

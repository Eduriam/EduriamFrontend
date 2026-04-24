"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { toLeagueVariant } from "components/leaderboard/leagueType";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import useAuth from "infrastructure/services/AuthProvider";
import type { LeagueType } from "infrastructure/api/generated/models";
import { LeaderboardService } from "infrastructure/services/users/LeaderboardService";

import LeaderboardComponent from "./components/Leaderboard/Leaderboard";
import LeaguesShelf from "./components/LeaguesShelf/LeaguesShelf";

function formatIsoDuration(duration: string | undefined): string {
  if (!duration || !duration.startsWith("P")) {
    return "0m";
  }

  const match = duration.match(
    /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:\d+S)?$/,
  );
  if (!match) {
    return duration;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}m`;
}

const LeaderboardPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { leaderboard } = LeaderboardService.useLeaderboard();
  const { user } = useAuth();

  const toResolvedLeague = (league?: LeagueType | null) => {
    const resolvedLeague = toLeagueVariant(league);
    return resolvedLeague === "locked" ? null : resolvedLeague;
  };

  const currentLeague =
    toResolvedLeague(leaderboard?.currentLeague) ??
    toResolvedLeague(user?.league) ??
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

  const currentLeagueName = t(`leaderboard.leagues.${currentLeague ?? "empty"}`);
  const navbarHeader = hasStartedWeek
    ? `${currentLeagueName} ${t("leaderboard.league")}`
    : t("leaderboard.leaguesLabel");

  const promotionZoneEndIndex = leaderboard?.zones?.promotionZoneEndIndex ?? 0;
  const demotionZoneStartIndex =
    leaderboard?.zones?.demotionZoneStartIndex ?? users.length;

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
            <Box data-test="leaderboard-section" sx={{ width: "100%" }}>
              <Stack spacing={0.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#111", fontWeight: 600 }}
                  >
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

                <Box
                  data-test="leaderboard-users-section"
                  sx={{ width: "100%" }}
                >
                  <LeaderboardComponent
                    users={users}
                    promotionEndIndex={promotionZoneEndIndex}
                    neutralEndIndex={demotionZoneStartIndex}
                    promotionLabel="Promotion Zone"
                    neutralLabel=""
                    demotionLabel="Demotion Zone"
                    currentUserId={user?.id ?? undefined}
                    currentUserDataTest="current-user-leaderboard-section"
                  />
                </Box>
              </Stack>
            </Box>
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

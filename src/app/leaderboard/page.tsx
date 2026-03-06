"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import LeagueIcon from "components/leaderboard/LeagueIcon";

import LeaderboardAPI from "infrastructure/api/user/leaderboard/LeaderboardAPI";
import useAuth from "infrastructure/services/AuthProvider";

import LeaderboardComponent from "./components/Leaderboard/Leaderboard";
import { getLeagueDisplayConfig } from "./leaderboard.config";

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
  const { leaderboard } = LeaderboardAPI.useLeaderboard();
  const { user } = useAuth();

  const currentLeague = leaderboard?.currentLeague ?? "gold";
  const hasStartedWeek = leaderboard?.hasStartedWeek ?? false;

  const { visibleLeagues, highlightedLeagueIndex } =
    getLeagueDisplayConfig(currentLeague);

  const users =
    leaderboard?.users.map((entry) => ({
      id: entry.id,
      rank: entry.rank,
      name: entry.name,
      xp: entry.xp,
      avatarDefinition: entry.avatarDefinition,
    })) ?? [];

  const currentLeagueName = t(`leaderboard.leagues.${currentLeague}`);
  const navbarHeader = hasStartedWeek
    ? `${currentLeagueName} ${t("leaderboard.league")}`
    : "Leagues";

  const promotionZoneEndIndex = leaderboard?.zones?.promotionZoneEndIndex ?? 0;
  const demotionZoneStartIndex =
    leaderboard?.zones?.demotionZoneStartIndex ?? users.length;

  return (
    <PageRoot data-test="leaderboard-page">
      <BasicNavbar header={navbarHeader} />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack direction="column" spacing={7} width="100%">
          <Stack
            direction="row"
            spacing={1.25}
            justifyContent="center"
            alignItems="center"
            width="100%"
            data-test="current-league-icon"
            pt={1.5}
          >
            {visibleLeagues.map((league, index) => (
              <LeagueIcon
                key={`${league}-${index}`}
                variant={league}
                size={index === highlightedLeagueIndex ? "large" : "medium"}
              />
            ))}
          </Stack>

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
                    currentUserId={user?.id}
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

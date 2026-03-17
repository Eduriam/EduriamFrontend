import type { LeaderboardLeague } from "infrastructure/api/users/me/leaderboard/Leaderboard";

export const LEAGUE_ORDER: Exclude<LeaderboardLeague, "locked">[] = [
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

const DISPLAY_SLOT_OFFSETS = [-2, -1, 0, 1, 2] as const;

export function getLeagueDisplayConfig(currentLeague: LeaderboardLeague): {
  visibleLeagues: LeaderboardLeague[];
  highlightedLeagueIndex: number;
} {
  const fallbackCurrentLeague: Exclude<LeaderboardLeague, "locked"> =
    currentLeague === "locked" ? "iron" : currentLeague;

  const currentIndex = LEAGUE_ORDER.indexOf(fallbackCurrentLeague);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  const visibleLeagues = DISPLAY_SLOT_OFFSETS.map((offset) => {
    const targetIndex = safeCurrentIndex + offset;

    if (targetIndex < 0 || targetIndex >= LEAGUE_ORDER.length) {
      return "locked";
    }

    if (targetIndex > safeCurrentIndex) {
      return "locked";
    }

    return LEAGUE_ORDER[targetIndex];
  });

  return {
    visibleLeagues,
    highlightedLeagueIndex: DISPLAY_SLOT_OFFSETS.indexOf(0),
  };
}

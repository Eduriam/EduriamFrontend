"use client";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import LeagueIcon, { type LeagueIconVariant } from "components/leaderboard/LeagueIcon";
import {
  LEAGUE_ORDER,
  type RankedLeagueVariant,
} from "components/leaderboard/leagueType";

export interface ILeaguesShelf {
  currentLeague: RankedLeagueVariant | null;
}

type LeagueShelfSlot =
  | {
      kind: "none";
    }
  | {
      kind: "icon";
      variant: LeagueIconVariant;
    };

const DISPLAY_SLOT_OFFSETS = [-2, -1, 0, 1, 2] as const;
const HIGHLIGHTED_LEAGUE_INDEX = DISPLAY_SLOT_OFFSETS.indexOf(0);

function getVisibleSlots(currentLeague: RankedLeagueVariant | null): LeagueShelfSlot[] {
  if (!currentLeague) {
    return DISPLAY_SLOT_OFFSETS.map((_, index) => {
      if (index < HIGHLIGHTED_LEAGUE_INDEX) {
        return { kind: "none" } as const;
      }

      if (index === HIGHLIGHTED_LEAGUE_INDEX) {
        return { kind: "icon", variant: "empty" } as const;
      }

      return { kind: "icon", variant: "locked" } as const;
    });
  }

  const currentIndex = LEAGUE_ORDER.indexOf(currentLeague);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  return DISPLAY_SLOT_OFFSETS.map((offset) => {
    const targetIndex = safeCurrentIndex + offset;

    if (targetIndex < 0 || targetIndex >= LEAGUE_ORDER.length) {
      return { kind: "none" } as const;
    }

    if (targetIndex > safeCurrentIndex) {
      return { kind: "icon", variant: "locked" } as const;
    }

    return { kind: "icon", variant: LEAGUE_ORDER[targetIndex] } as const;
  });
}

const LeaguesShelf: React.FC<ILeaguesShelf> = ({ currentLeague }) => {
  const visibleSlots = getVisibleSlots(currentLeague);

  return (
    <Stack
      direction="row"
      spacing={1.25}
      justifyContent="center"
      alignItems="center"
      width="100%"
      data-test="current-league-icon"
      pt={1.5}
    >
      {visibleSlots.map((slot, index) => {
        const isHighlighted = index === HIGHLIGHTED_LEAGUE_INDEX;
        const iconSize = isHighlighted ? "large" : "medium";
        const iconSizeInPixels = isHighlighted ? 90 : 64;

        if (slot.kind === "none") {
          return (
            <Box
              key={`none-${index}`}
              sx={{
                width: iconSizeInPixels,
                height: iconSizeInPixels,
                flexShrink: 0,
              }}
            />
          );
        }

        return (
          <LeagueIcon
            key={`${slot.variant}-${index}`}
            variant={slot.variant}
            size={iconSize}
          />
        );
      })}
    </Stack>
  );
};

export default LeaguesShelf;

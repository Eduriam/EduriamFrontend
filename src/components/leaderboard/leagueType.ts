import type { LeagueType } from "infrastructure/api/generated/models";
import { LeagueType as LeagueTypeEnum } from "infrastructure/api/generated/models";

import type { LeagueIconVariant } from "./LeagueIcon";

export type RankedLeagueVariant = Exclude<LeagueIconVariant, "empty" | "locked">;

export const LEAGUE_ORDER: RankedLeagueVariant[] = Object.keys(
  LeagueTypeEnum,
).map((leagueName) => leagueName.toLowerCase() as RankedLeagueVariant);

export function toLeagueVariant(
  league?: LeagueType | null,
): RankedLeagueVariant | "locked" {
  if (league === null || league === undefined) {
    return "locked";
  }

  const enumKey = Object.entries(LeagueTypeEnum).find(
    ([, value]) => value === league,
  )?.[0];

  if (!enumKey) {
    return "locked";
  }

  const normalized = enumKey.toLowerCase() as RankedLeagueVariant;
  return LEAGUE_ORDER.includes(normalized) ? normalized : "locked";
}

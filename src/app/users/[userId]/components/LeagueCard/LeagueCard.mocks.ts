import { LeagueType } from "infrastructure/api/generated/models";

import type { ILeagueCard } from "./LeagueCard";

export const mockLeagueCardProps: ILeagueCard = {
  league: LeagueType.Gold,
};

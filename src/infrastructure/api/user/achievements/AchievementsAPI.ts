import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { Achievement } from "./Achievements";

export interface AchievementParams {}

const AchievementsAPI = {
  URI: "user/achievements",

  useAchievements(
    params: AchievementParams = {},
  ): Modify<
    FetchHook<Array<Achievement>>,
    { achievements: Array<Achievement> }
  > {
    const { data, ...rest } = useAPI<Array<Achievement>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { achievements: data, ...rest };
  },

  async collectReward(achievement: Partial<Achievement>): Promise<Achievement> {
    return API.put(`${this.URI}/${achievement.id}/collect-reward`, {});
  },
};

export default AchievementsAPI;

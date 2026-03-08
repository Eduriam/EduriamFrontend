import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { Challenge } from "./ActiveChallenges";

export interface ChallengeParams {}

const ActiveChallengesAPI = {
  URI: "user/active-challenges",

  useChallenges(
    params: ChallengeParams = {},
  ): Modify<FetchHook<Array<Challenge>>, { challenges: Array<Challenge> }> {
    const { data, ...rest } = useAuthenticatedAPI<Array<Challenge>>(
      `${this.URI}?${parseQueryParams(params)}`,
    );
    return { challenges: data, ...rest };
  },

  async collectReward(challenge: Partial<Challenge>): Promise<Challenge> {
    return API.put(`${this.URI}/${challenge.id}/collect-reward`, {});
  },
};

export default ActiveChallengesAPI;



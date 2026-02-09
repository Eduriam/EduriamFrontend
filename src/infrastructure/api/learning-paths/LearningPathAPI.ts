import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { LearningPath } from "./LearningPath";

const LearningPathAPI = {
  URI: "learning-paths",

  async getLearningPath(id: Id): Promise<LearningPath> {
    return API.get(`${this.URI}/${id}`);
  },

  useLearningPath(
    id: Id,
  ): Modify<FetchHook<LearningPath>, { learningPath: LearningPath }> {
    const { data, ...rest } = useAPI<LearningPath>(`${this.URI}/${id}`);
    return { learningPath: data, ...rest };
  },
};

export default LearningPathAPI;

import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { StudyPlanOverview } from "./StudyPlan";

const StudyPlanAPI = {
  URI: "user/study-plan",

  useStudyPlan(): Modify<
    FetchHook<StudyPlanOverview>,
    { studyPlan: StudyPlanOverview | undefined }
  > {
    const { data, ...rest } = useAPI<StudyPlanOverview>(this.URI);

    return {
      studyPlan: data,
      ...rest,
    };
  },

  async getStudyPlan(): Promise<StudyPlanOverview> {
    return API.get(this.URI);
  },
};

export default StudyPlanAPI;


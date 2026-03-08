import { Modify } from "domain/models/utils/modify";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { StudyPlanOverview } from "./StudyPlan";

const StudyPlanAPI = {
  URI: "users/me/study-plan",

  useStudyPlan(): Modify<
    FetchHook<StudyPlanOverview>,
    { studyPlan: StudyPlanOverview | undefined }
  > {
    const { data, ...rest } = useAuthenticatedAPI<StudyPlanOverview>(this.URI);

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



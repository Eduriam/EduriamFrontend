import { Modify } from "domain/models/utils/modify";
import { mutate } from "swr";

import { FetchHook } from "infrastructure/api/API";
import { StudyPlanOverviewModel } from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const StudyPlanService = {
  URI: "users/me/study-plan",

  useStudyPlan(): Modify<
    FetchHook<StudyPlanOverviewModel>,
    { studyPlan: StudyPlanOverviewModel | undefined }
  > {
    const { data, ...rest } = useAuthenticatedAPI<StudyPlanOverviewModel>(
      this.URI,
    );

    return {
      studyPlan: data,
      ...rest,
    };
  },

  async getStudyPlan(): Promise<StudyPlanOverviewModel | void> {
    try {
      const response = await usersClient.getApiUsersMeStudyPlan();
      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async invalidateStudyPlan(): Promise<void> {
    try {
      await mutate(this.URI);
    } catch {
      // Non-blocking revalidation should not fail user-facing flows.
    }
  },
};

export default StudyPlanService;

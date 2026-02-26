import { AtomProgressRating, StudySessionDTO } from "@eduriam/ui-x";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";

import useAPI from "../../../hooks/useAPI";

export interface StudySessionParams {
  lessonId?: Id;
  courseId?: Id;
  mode?: "learn" | "review";
}

export interface StudySessionUpdateBody {
  lessonId?: Id;
  courseId?: Id;
  atomProgress: Array<Pick<AtomProgressRating, "atomId" | "rating">>;
}

const StudySessionAPI = {
  URI: "users/me/study-sessions",

  useStudySession(
    params: StudySessionParams = {},
  ): Modify<FetchHook<StudySessionDTO>, { studySession: StudySessionDTO }> {
    const queryParams = parseQueryParams(params);
    const uri =
      queryParams.length > 0 ? `${this.URI}?${queryParams}` : this.URI;
    const { data, ...rest } = useAPI<StudySessionDTO>(uri);

    return {
      studySession: data,
      ...rest,
    };
  },

  async updateStudySession(payload: StudySessionUpdateBody): Promise<void> {
    await API.post(this.URI, payload);
  },
};

export default StudySessionAPI;

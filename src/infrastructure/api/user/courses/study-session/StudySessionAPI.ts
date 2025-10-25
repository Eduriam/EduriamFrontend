import { StudySessionDTO } from "@eduriam/ui-x";
import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";

import useAPI from "../../../hooks/useAPI";
import { UserAnswerDTO } from "./QuestionAttempt";
import { Reward } from "./StudySession";

export interface StudySessionParams {
  lessonId?: Id;
}

const StudySessionAPI = {
  URI: (courseId: Id) => `user/courses/${courseId}/study-session`,

  useStudySession(
    courseId: Id,
    params: StudySessionParams = {},
  ): Modify<FetchHook<StudySessionDTO>, { studySession: StudySessionDTO }> {
    const { data, ...rest } = useAPI<StudySessionDTO>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { studySession: data, ...rest };
  },

  async updateStudySession(
    courseId: Id,
    attempts: Array<UserAnswerDTO>,
  ): Promise<Reward> {
    return API.post(`${this.URI(courseId)}`, attempts);
  },
};

export default StudySessionAPI;

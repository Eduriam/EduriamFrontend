import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";

import useAPI from "../../../hooks/useAPI";
import { Exercise } from "./Exercises";
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
  ): Modify<FetchHook<Array<Exercise>>, { exercises: Array<Exercise> }> {
    const { data, ...rest } = useAPI<Array<Exercise>>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { exercises: data, ...rest };
  },

  async updateStudySession(
    courseId: Id,
    attempts: Array<UserAnswerDTO>,
  ): Promise<Reward> {
    return API.post(`${this.URI(courseId)}`, attempts);
  },
};

export default StudySessionAPI;

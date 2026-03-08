import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { StudyMap } from "./StudyMap";

export interface StudyMapParams {
  level?: number;
  page?: number;
  limit?: number;
}

const StudyMapAPI = {
  URI: (courseId: Id) => `user/courses/${courseId}/study-map`,

  useStudyMap(
    courseId: Id,
    params: StudyMapParams,
  ): Modify<FetchHook<StudyMap>, { studyMap: StudyMap }> {
    const { data, ...rest } = useAuthenticatedAPI<StudyMap>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { studyMap: data, ...rest };
  },

  async setActiveLesson(courseId: Id, lessonId: Id): Promise<void> {
    return API.put(`${this.URI(courseId)}/active/${lessonId}`, {});
  },
};

export default StudyMapAPI;



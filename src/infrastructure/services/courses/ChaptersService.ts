import type { Id } from "domain/models/types/core";
import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import { getCourses } from "infrastructure/api/generated/courses/courses";
import type { CourseChapterModel } from "infrastructure/api/generated/models";
import useAPI from "infrastructure/api/hooks/useAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const coursesClient = getCourses();

function useChapterQuery(
  courseId: Id,
  chapterId: Id,
): Modify<FetchHook<CourseChapterModel>, { chapter: CourseChapterModel }> {
  const { data, ...rest } = useAPI<CourseChapterModel>(
    `courses/${courseId}/chapters/${chapterId}`,
    async () => ChaptersService.getChapter(courseId, chapterId),
  );

  return { chapter: data, ...rest };
}

export const ChaptersService = {
  async getChapter(courseId: Id, chapterId: Id): Promise<CourseChapterModel> {
    try {
      const response = await coursesClient.getApiCoursesCourseIdChaptersChapterId(
        courseId,
        chapterId,
      );

      if (!response.data) {
        throw new Error("Chapter response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  useChapter(
    courseId: Id,
    chapterId: Id,
  ): Modify<FetchHook<CourseChapterModel>, { chapter: CourseChapterModel }> {
    return useChapterQuery(courseId, chapterId);
  },
};
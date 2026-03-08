import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { LessonItem, LessonItemSummary } from "./LessonItems";

export interface LessonItemParams {
  favorite?: boolean;
  searchName?: string;
}

const LessonItemsAPI = {
  URI: (courseId: Id) => `user/courses/${courseId}/vocabulary`,

  useLessonItem(
    courseId: Id,
    id: Id,
  ): Modify<FetchHook<LessonItem>, { lessonItem: LessonItem }> {
    const { data, ...rest } = useAuthenticatedAPI<LessonItem>(`${this.URI(courseId)}/${id}`);
    return { lessonItem: data, ...rest };
  },

  useLessonItems(
    courseId: Id,
    params: LessonItemParams = {},
  ): Modify<
    FetchHook<Array<LessonItemSummary>>,
    { lessonItems: Array<LessonItemSummary> }
  > {
    const { data, ...rest } = useAuthenticatedAPI<Array<LessonItemSummary>>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { lessonItems: data, ...rest };
  },

  async updateLessonItem(
    courseId: Id,
    lessonItem: Partial<LessonItem>,
  ): Promise<LessonItem> {
    return API.patch(`${this.URI(courseId)}/${lessonItem.id}`, lessonItem);
  },
};

export default LessonItemsAPI;



import { Modify } from "domain/models/utils/modify";
import { FetchHook } from "infrastructure/api/API";
import useAPI from "infrastructure/api/hooks/useAPI";

import { CourseChapter } from "./Chapters";

const ChaptersAPI = {
  URI: (courseId: Id, chapterId: Id) =>
    `courses/${courseId}/chapters/${chapterId}`,

  useChapter(
    courseId: Id,
    chapterId: Id,
  ): Modify<FetchHook<CourseChapter>, { chapter: CourseChapter }> {
    const { data, ...rest } = useAPI<CourseChapter>(this.URI(courseId, chapterId));
    return { chapter: data, ...rest };
  },
};

export default ChaptersAPI;


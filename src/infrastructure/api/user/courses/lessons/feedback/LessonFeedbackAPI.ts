import API from "infrastructure/api/API";

import { Feedback } from "./LessonFeedback";

export interface LessonFeedbackParams {}

const LessonFeedbackAPI = {
  URI: (courseId: Id, lessonId: Id) =>
    `user/courses/${courseId}/lessons/${lessonId}/feedback`,

  async updateLessonFeedback(
    courseId: Id,
    lessonId: Id,
    feedback: Partial<Feedback>,
  ): Promise<void> {
    return API.put(`${this.URI(courseId, lessonId)}`, feedback);
  },
};

export default LessonFeedbackAPI;

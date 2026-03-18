export interface ChapterLesson {
  id: Id;
  name: string;
  /** Whether the lesson is completed by the current user. */
  completed?: boolean;
  /** Whether the lesson is the current active lesson. */
  upcoming?: boolean;
}

export interface ChapterSection {
  id: Id;
  name: string;
  lessons: Array<ChapterLesson>;
}

export interface CourseChapter {
  id: Id;
  name: string;
  sections: Array<ChapterSection>;
}

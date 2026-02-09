import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import CircleLessonButton from "components/atoms/CircleLessonButton/CircleLessonButton";

import {
  StudyMap,
  StudyMapLesson,
} from "infrastructure/api/user/courses/study-map/StudyMap";
import StudyMapAPI from "infrastructure/api/user/courses/study-map/StudyMapAPI";
import mutateArrayItem from "infrastructure/api/utils/mutateArrayItem";

export interface ILessonsPaginationPage {
  courseId: Id;
  level?: number;
  lastViewedLevel: number;

  index: number;
  mapHeight: number;

  onActiveLessonChange: (lessonId: Id) => void;
  activeLessonId: Id | undefined;
}

export const LESSONS_PER_PAGE = 6;

const LessonsPaginationPage: React.FC<ILessonsPaginationPage> = ({
  courseId,
  level,
  lastViewedLevel,
  index,
  mapHeight,
  onActiveLessonChange,
  activeLessonId,
}) => {
  const { studyMap, mutate } = StudyMapAPI.useStudyMap(courseId, {
    level: level ?? lastViewedLevel,
    page: index + 1,
    limit: 10,
  });
  const [lessons, setLessons] = useState<Array<StudyMapLesson>>([]);

  function handleSetActive(lessonId: Id) {
    const change: Pick<StudyMapLesson, "id" | "isActive"> = {
      id: lessonId,
      isActive: true,
    };

    const newStudyMap = studyMap.map((e) => {
      return { ...e, isActive: undefined };
    });

    mutateArrayItem(newStudyMap, lessonId, change, mutate, () =>
      StudyMapAPI.setActiveLesson(courseId, lessonId),
    );

    onActiveLessonChange(lessonId);
  }

  useEffect(() => {
    const lessons = studyMap
      ? studyMap.map((lesson) => {
          if (lesson.isActive) {
            if (activeLessonId === undefined) {
              onActiveLessonChange(lesson.id);
              return lesson;
            } else if (activeLessonId !== lesson.id) {
              return { ...lesson, isActive: undefined };
            } else {
              return lesson;
            }
          } else {
            return lesson;
          }
        })
      : [];

    setLessons(lessons);
  }, [studyMap, activeLessonId, onActiveLessonChange, setLessons]);

  function renderLessons(lessons: StudyMap) {
    const markup = [];

    for (let i = 0; i < lessons.length; i++) {
      let style = {};
      switch (i % 3) {
        case 0:
          style = {
            position: "absolute",
            top: `${
              ((Math.floor(i / 3) * 400 + 100 + index * 800) / mapHeight) * 100
            }%`,
            left: "55%",
          };
          break;
        case 1:
          style = {
            position: "absolute",
            top: `${
              ((Math.floor(i / 3) * 400 + 200 + index * 800) / mapHeight) * 100
            }%`,
            left: "16.666%",
          };
          break;
        case 2:
          style = {
            position: "absolute",
            top: `${
              ((Math.floor(i / 3) * 400 + 310 + index * 800) / mapHeight) * 100
            }%`,
            left: "70%",
          };
          break;
      }

      markup.push(
        <Box
          style={{ ...style, transform: "translate(-50%, -45%)" }}
          key={`${index}-${lessons[i].id}`}
        >
          <CircleLessonButton
            title={lessons[i].name}
            icon="study"
            lessonType={lessons[i].type}
            lessonId={lessons[i].id}
            active={lessons[i].isActive}
            onSetActive={handleSetActive}
          />
        </Box>,
      );
    }
    return markup;
  }

  return <>{lessons && renderLessons(lessons)}</>;
};

export default LessonsPaginationPage;

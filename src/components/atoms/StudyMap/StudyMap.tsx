import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import LessonsPaginationPage, {
  LESSONS_PER_PAGE,
} from "components/layouts/LessonsPaginationPage/LessonsPaginationPage";

import StudyPath from "../StudyPath/StudyPath";

export interface IStudyMap {
  courseId: Id;
  level?: number;
  lastViewedLevel: number;
}

export function getNumberOfCurves(numberOfLessons: number) {
  if (numberOfLessons % 3 === 1) {
    return Math.floor(numberOfLessons / 3) * 2 + 1;
  } else if (numberOfLessons % 3 === 2) {
    return Math.floor(numberOfLessons / 3) * 2 + 2;
  } else {
    return Math.floor(numberOfLessons / 3) * 2;
  }
}

const StudyMap: React.FC<IStudyMap> = ({
  courseId,
  level,
  lastViewedLevel,
}) => {
  const loader = useRef(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [activeLessonId, setActiveLessonId] = useState<Id | undefined>(
    undefined,
  );

  function renderPages(pageCounter: number) {
    const pages = [];
    for (let i = 0; i < pageCounter; i++) {
      pages.push(
        <LessonsPaginationPage
          key={`page-${i}`}
          index={i}
          courseId={courseId}
          level={level}
          lastViewedLevel={lastViewedLevel}
          mapHeight={getNumberOfCurves(LESSONS_PER_PAGE * pageCounter) * 200}
          activeLessonId={activeLessonId}
          onActiveLessonChange={(lessonId) => setActiveLessonId(lessonId)}
        />,
      );
    }

    return pages;
  }

  // Source: https://medium.com/suyeonme/react-how-to-implement-an-infinite-scroll-749003e9896a
  const handleObserver = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPageCounter((prev) => prev + 1);
      }
    },
    [],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <StudyPath
        numberOfCurves={getNumberOfCurves(LESSONS_PER_PAGE * pageCounter)}
      />
      <Box>{renderPages(pageCounter)}</Box>
      <Box ref={loader} id="loader" />
    </Box>
  );
};

export default StudyMap;

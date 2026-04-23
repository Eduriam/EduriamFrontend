"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Header } from "@eduriam/ui-core";
import { Id } from "domain/models/types/core";

import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { StudyPlanCourse, StudyPlanLaneId } from "../../types/studyPlan.types";
import { toCourseDndId, toLaneDndId } from "../../util/studyPlanDndIds";
import StudyPlanCourseCard from "../StudyPlanCourseCard/StudyPlanCourseCard";

interface ISortableCourseCard {
  course: StudyPlanCourse;
  laneId: StudyPlanLaneId;
  isLearnLane: boolean;
  isActiveCourse: boolean;
  onCourseClick?: () => void;
  onPlayClick?: () => void;
}

const SortableCourseCard: React.FC<ISortableCourseCard> = ({
  course,
  laneId,
  isLearnLane,
  isActiveCourse,
  onCourseClick,
  onPlayClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: toCourseDndId(course.id),
    data: {
      laneId,
      courseId: course.id,
    },
  });

  return (
    <Box
      ref={setNodeRef}
      data-test={course.dataTest}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
        visibility: isDragging && isActiveCourse ? "hidden" : "visible",
        opacity: isDragging && isActiveCourse ? 0 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <StudyPlanCourseCard
        title={course.title}
        logoVariant={course.logoVariant}
        onCourseClick={onCourseClick}
        onPlayClick={isLearnLane ? onPlayClick : undefined}
        data-test-learn-button={course["data-test-learn-button"]}
        data-test-course-click-area={course["data-test-course-click-area"]}
      />
    </Box>
  );
};

export interface IStudyPlanLane {
  laneId: StudyPlanLaneId;
  title: string;
  dataTest: string;
  courses: StudyPlanCourse[];
  activeCourseId: Id | null;
  activeCourseLane: StudyPlanLaneId | null;
  isActiveDragOver: boolean;
  onCourseClick: (courseId: Id) => () => void;
  onPlayClick: (courseId: Id) => () => void;
}

const StudyPlanLane: React.FC<IStudyPlanLane> = ({
  laneId,
  title,
  dataTest,
  courses,
  activeCourseId,
  activeCourseLane,
  isActiveDragOver,
  onCourseClick,
  onPlayClick,
}) => {
  const { setNodeRef } = useDroppable({
    id: toLaneDndId(laneId),
  });
  const isLearnLane = laneId === "learn";
  const showDropPlaceholder =
    activeCourseId !== null &&
    isActiveDragOver &&
    activeCourseLane !== null &&
    activeCourseLane !== laneId;

  return (
    <Box data-test={dataTest} sx={{ width: "100%", minHeight: 140 }}>
      <Header variant="section" text={title} />
      <Stack
        ref={setNodeRef}
        direction="column"
        spacing={3}
        mt={3}
        minHeight={80}
      >
        {showDropPlaceholder && (
          <Box
            sx={{
              height: 96,
              borderRadius: 2,
              border: "2px dashed",
              borderColor: "divider",
              bgcolor: "background.paper",
              opacity: 0.8,
            }}
          />
        )}

        <SortableContext
          items={courses.map((course) => toCourseDndId(course.id))}
          strategy={verticalListSortingStrategy}
        >
          {courses.map((course) => (
            <SortableCourseCard
              key={course.id}
              course={course}
              laneId={laneId}
              isLearnLane={isLearnLane}
              isActiveCourse={course.id === activeCourseId}
              onCourseClick={onCourseClick(course.id)}
              onPlayClick={onPlayClick(course.id)}
            />
          ))}
        </SortableContext>
      </Stack>
    </Box>
  );
};

export default StudyPlanLane;

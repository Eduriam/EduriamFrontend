import { UniqueIdentifier } from "@dnd-kit/core";
import { Id } from "domain/models/types/core";

import { StudyPlanLaneId } from "../types/studyPlan.types";

const COURSE_DND_PREFIX = "course:";
const LANE_DND_PREFIX = "lane:";

export function toCourseDndId(courseId: Id): string {
  return `${COURSE_DND_PREFIX}${courseId}`;
}

export function toLaneDndId(laneId: StudyPlanLaneId): string {
  return `${LANE_DND_PREFIX}${laneId}`;
}

export function parseCourseIdFromDndId(
  dndId: UniqueIdentifier | null | undefined,
): Id | null {
  if (typeof dndId !== "string" || !dndId.startsWith(COURSE_DND_PREFIX)) {
    return null;
  }

  const parsed = Number(dndId.slice(COURSE_DND_PREFIX.length));
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseLaneIdFromDndId(
  dndId: UniqueIdentifier | null | undefined,
): StudyPlanLaneId | null {
  if (typeof dndId !== "string" || !dndId.startsWith(LANE_DND_PREFIX)) {
    return null;
  }

  const laneId = dndId.slice(LANE_DND_PREFIX.length);
  if (laneId === "learn" || laneId === "review" || laneId === "paused") {
    return laneId;
  }

  return null;
}

"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import { Id } from "domain/models/types/core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import { UserProductsService } from "infrastructure/services/courses/UserProductsService";

import StudyPlanCourseCard from "./components/StudyPlanCourseCard/StudyPlanCourseCard";
import StudyPlanLane from "./components/StudyPlanLane/StudyPlanLane";
import { StudyPlanLaneId, StudyPlanState } from "./types/studyPlan.types";
import {
  createInitialStateFromCourses,
  findCourseLocation,
  mapLaneToStudyMode,
} from "./util/studyPlan.utils";
import {
  parseCourseIdFromDndId,
  parseLaneIdFromDndId,
} from "./util/studyPlanDndIds";

const StudyPlanPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { userProducts, mutate } = UserProductsService.useUserProducts();
  const lanes = React.useMemo<StudyPlanState | null>(
    () => createInitialStateFromCourses(userProducts),
    [userProducts],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [activeCourseId, setActiveCourseId] = React.useState<Id | null>(null);
  const [activeCourseLane, setActiveCourseLane] =
    React.useState<StudyPlanLaneId | null>(null);
  const [dragOverLane, setDragOverLane] =
    React.useState<StudyPlanLaneId | null>(null);

  const resetDragState = React.useCallback(() => {
    setActiveCourseId(null);
    setActiveCourseLane(null);
    setDragOverLane(null);
  }, []);

  const getLaneFromOverId = React.useCallback(
    (dndId: UniqueIdentifier | null | undefined): StudyPlanLaneId | null => {
      if (!lanes) {
        return null;
      }

      const explicitLane = parseLaneIdFromDndId(dndId);
      if (explicitLane) {
        return explicitLane;
      }

      const courseId = parseCourseIdFromDndId(dndId);
      if (courseId === null) {
        return null;
      }

      return findCourseLocation(lanes, courseId)?.laneId ?? null;
    },
    [lanes],
  );

  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      if (!lanes) {
        return;
      }

      const startedCourseId = parseCourseIdFromDndId(event.active.id);
      if (startedCourseId === null) {
        return;
      }

      const location = findCourseLocation(lanes, startedCourseId);
      if (!location) {
        return;
      }

      setActiveCourseId(startedCourseId);
      setActiveCourseLane(location.laneId);
      setDragOverLane(location.laneId);
    },
    [lanes],
  );

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      const laneId = getLaneFromOverId(event.over?.id);
      if (!laneId) {
        return;
      }

      setDragOverLane(laneId);
    },
    [getLaneFromOverId],
  );

  const handleDragCancel = React.useCallback(() => {
    resetDragState();
  }, [resetDragState]);

  const handleDragEnd = React.useCallback(
    async (event: DragEndEvent) => {
      if (!lanes || activeCourseId === null || activeCourseLane === null) {
        resetDragState();
        return;
      }

      const targetLane = getLaneFromOverId(event.over?.id);
      if (!targetLane || targetLane === activeCourseLane) {
        resetDragState();
        return;
      }

      const courseId = activeCourseId;
      resetDragState();

      const newStudyMode = mapLaneToStudyMode(targetLane);
      const optimisticProducts = (userProducts ?? []).map((product) =>
        product.id === courseId
          ? {
              ...product,
              studyMode: newStudyMode,
            }
          : product,
      );

      try {
        await mutate(async () => {
          await UserProductsService.updateStudyMode(courseId, newStudyMode);
          return optimisticProducts;
        }, optimisticMutationOption(optimisticProducts));
      } catch {
        // On failure, SWR rollback restores previous study mode state.
      }
    },
    [
      activeCourseId,
      activeCourseLane,
      getLaneFromOverId,
      lanes,
      mutate,
      resetDragState,
      userProducts,
    ],
  );

  const activeCourseLocation = React.useMemo(() => {
    if (!lanes || activeCourseId === null) {
      return null;
    }

    return findCourseLocation(lanes, activeCourseId);
  }, [activeCourseId, lanes]);

  const renderLane = (
    laneId: StudyPlanLaneId,
    title: string,
    dataTest: string,
  ) => (
    <StudyPlanLane
      key={laneId}
      laneId={laneId}
      title={title}
      dataTest={dataTest}
      courses={lanes?.[laneId] ?? []}
      activeCourseId={activeCourseId}
      activeCourseLane={activeCourseLane}
      isActiveDragOver={dragOverLane === laneId}
      onCourseClick={(courseId: Id) =>
        navigateWithTransition(`/courses/${courseId}`)
      }
      onPlayClick={(courseId: Id) =>
        navigateWithTransition(`/study?courseId=${courseId}`)
      }
    />
  );

  if (!lanes) {
    return (
      <PageRoot data-test="study-plan-page">
        <PageNavigation
          topNavigation={
            <BackNavbar
              withTransition
              route="/"
              rightButton={{
                icon: "add",
                onClick: navigateWithTransition("/courses"),
              }}
              header={t("studyPlanPage.header") ?? "Study Plan"}
            />
          }
          mainNavigation="desktopOnly"
        />
      </PageRoot>
    );
  }

  return (
    <PageRoot data-test="study-plan-page">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "background.default",
        }}
      >
        <PageNavigation
          topNavigation={
            <BackNavbar
              withTransition
              route="/"
              rightButton={{
                icon: "add",
                onClick: navigateWithTransition("/courses"),
              }}
              header={t("studyPlanPage.header") ?? "Study Plan"}
            />
          }
          mainNavigation="desktopOnly"
        />
      </Box>

      <ContentContainer width="small" justifyContent="flex-start" spacing={10}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
        >
          <Box data-test="study-plan-section" sx={{ width: "100%" }}>
            <Stack width="100%" spacing={8}>
              {renderLane(
                "learn",
                t("studyPlanPage.learnAndReview") ?? "Learn and Review",
                "learn-courses-list-section",
              )}
              {renderLane(
                "review",
                t("studyPlanPage.reviewOnly") ?? "Review Only",
                "review-courses-list-section",
              )}
              {renderLane(
                "paused",
                t("studyPlanPage.paused") ?? "Paused",
                "paused-courses-list-section",
              )}
            </Stack>
          </Box>

          <DragOverlay>
            {activeCourseLocation?.course ? (
              <StudyPlanCourseCard
                title={activeCourseLocation.course.title}
                logoVariant={activeCourseLocation.course.logoVariant}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </ContentContainer>
    </PageRoot>
  );
};

export default StudyPlanPage;

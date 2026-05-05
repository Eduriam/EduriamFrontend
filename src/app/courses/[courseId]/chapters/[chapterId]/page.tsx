"use client";

import {
  ContentContainer,
  Header,
  PageRoot,
} from "@eduriam/ui-core";
import { Id } from "domain/models/types/core";
import { parseId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import LessonListItem from "components/courses/LessonListItem/LessonListItem";
import SectionCard from "components/courses/SectionCard/SectionCard";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { ChaptersService } from "infrastructure/services/courses/ChaptersService";

export interface ICourseChapterPage {}

const CourseChapterPage: React.FC<ICourseChapterPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();
  const router = useRouter();

  const params = useParams();
  const courseId = parseId(params?.courseId);
  const chapterId = parseId(params?.chapterId);
  const safeCourseId = courseId ?? 0;
  const safeChapterId = chapterId ?? 0;

  const { chapter } = ChaptersService.useChapter(safeCourseId, safeChapterId);

  useEffect(() => {
    if (courseId === undefined || chapterId === undefined) {
      router.replace("/courses");
    }
  }, [chapterId, courseId, router]);

  const sections = useMemo(() => chapter?.sections ?? [], [chapter?.sections]);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (sectionId: Id) => {
    setExpandedSections((prev) => {
      const key = String(sectionId);
      const current = prev[key];
      const next = current === undefined ? true : !current;
      return { ...prev, [key]: next };
    });
  };

  const isSectionExpanded = (sectionId: Id) => {
    const key = String(sectionId);
    const value = expandedSections[key];
    // Default to collapsed (false) when not explicitly toggled
    return value === undefined ? false : value;
  };

  return (
    <PageRoot data-test="chapter-page">
      <PageNavigation
        topNavigation={
          <BackNavbar withTransition route={`/courses/${safeCourseId}`} />
        }
        mainNavigation="hidden"
      />
      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="none"
      >
        <Stack spacing={4} sx={{ py: 3, width: "100%" }}>
          <Header variant="section" text={chapter?.name ?? ""} />

          <Box
            sx={{ width: "100%", position: "relative" }}
            data-test="sections-list-section"
          >
            {sections.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  left: 36,
                  top: 24,
                  bottom: 0,
                  width: 4,
                  bgcolor: "divider",
                  borderRadius: 999,
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            )}
            <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
              {sections.map((section) => {
                const expanded = isSectionExpanded(section.id);

                return (
                  <Stack key={section.id} spacing={2} sx={{ width: "100%" }}>
                    <SectionCard
                      title={section.name}
                      expanded={expanded}
                      onToggle={() => toggleSection(section.id)}
                      data-test="section-card"
                    />
                    {expanded && (
                      <Stack spacing={2} data-test="lessons-list-section">
                        {section.lessons.map((lesson) => (
                          <LessonListItem
                            key={lesson.id}
                            title={lesson.name}
                            status={
                              lesson.upcoming
                                ? "active"
                                : lesson.completed
                                  ? "completed"
                                  : "default"
                            }
                            onClick={navigateWithTransition(
                              `/study?lessonId=${lesson.id}`,
                            )}
                            data-test="lesson-button"
                          />
                        ))}
                      </Stack>
                    )}
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default CourseChapterPage;

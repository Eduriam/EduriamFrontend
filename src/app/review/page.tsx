"use client";

import { ContentContainer, LargeButton, PageRoot } from "@eduriam/ui-core";
import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";
import { Id } from "domain/models/types/core";
import { useTranslation } from "i18n/client";
import { parseId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeBoard from "components/notices/NoticeBoard/NoticeBoard";

import { NoticeType, UserRole } from "infrastructure/api/generated/models";
import StudyPlanService from "infrastructure/api/users/me/study-plan/StudyPlanService";
import useAuth from "infrastructure/services/AuthProvider";

import StudyPreview from "../(home)/components/StudyPreview/StudyPreview";
import ReviewCourseStudySession from "./components/ReviewCourseStudySession";

export interface IReviewPage {}
const REVIEW_NOTICE_TYPES = [
  NoticeType.CHEST_REWARD,
  NoticeType.STREAK_MILESTONE,
  NoticeType.STREAK_LOST,
  NoticeType.STREAK_SAVED,
] as const;

const ReviewPage: React.FC<IReviewPage> = () => {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();
  const queryCourseIdRaw = searchParams.get("courseId");

  const [selectedCourseId, setSelectedCourseId] = useState<Id | undefined>(() =>
    parseId(queryCourseIdRaw),
  );

  useEffect(() => {
    const queryCourseId = parseId(searchParams.get("courseId"));
    setSelectedCourseId(queryCourseId);
  }, [searchParams]);

  const { studyPlan, isLoading: isStudyPlanLoading } =
    StudyPlanService.useStudyPlan();

  const upcomingReviewCourse = studyPlan?.upcomingReviewCourse;
  const queryCourseId = parseId(queryCourseIdRaw);

  useEffect(() => {
    if (queryCourseIdRaw && queryCourseId === undefined) {
      router.replace("/", { scroll: false });
      return;
    }

    if (isStudyPlanLoading) {
      return;
    }

    if (!upcomingReviewCourse && !queryCourseId) {
      router.replace("/", { scroll: false });
    }
  }, [
    isStudyPlanLoading,
    queryCourseId,
    queryCourseIdRaw,
    router,
    upcomingReviewCourse,
  ]);

  const handleStartReview = () => {
    if (!upcomingReviewCourse?.id) {
      return;
    }

    const upcomingReviewCourseId = parseId(upcomingReviewCourse.id);
    if (upcomingReviewCourseId === undefined) {
      return;
    }

    const hasNoEnergy = (user?.energy ?? 0) <= 0;
    const isPremiumUser = user?.role === UserRole.PremiumUser;

    if (user && !isPremiumUser && hasNoEnergy) {
      router.replace(getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft), {
        scroll: false,
      });
      return;
    }

    setSelectedCourseId(upcomingReviewCourseId);
    router.replace(`/review?courseId=${upcomingReviewCourseId}`, {
      scroll: false,
    });
  };

  return (
    <PageRoot data-test="review-page">
      <NoticeBoard allowedNoticeTypes={[...REVIEW_NOTICE_TYPES]} />

      {selectedCourseId ? (
        <ReviewCourseStudySession courseId={selectedCourseId} />
      ) : (
        <ContentContainer width="small" justifyContent="flex-start">
          <Stack
            spacing={8}
            alignItems="center"
            sx={{ width: "100%", mt: 10 }}
            data-test="review-section"
          >
            {!isStudyPlanLoading && (
              <>
                <StudyPreview
                  title={upcomingReviewCourse?.title ?? "Fullstack Developer"}
                  description={
                    t("home.reviewDescription") ??
                    "Review the most important concepts carefully selected for you."
                  }
                  imageSrc={upcomingReviewCourse?.thumbnailUrl ?? undefined}
                />

                <Stack spacing={4} alignItems="center" sx={{ width: "100%" }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                  >
                    {t("review.reviewXpInfo") ?? "Reviews give you 2x the XP!"}
                  </Typography>

                  <LargeButton
                    fullWidth
                    onClick={handleStartReview}
                    disabled={!upcomingReviewCourse?.id}
                    data-test="start-review-button"
                  >
                    {t("home.startReview") ?? "Start review"}
                  </LargeButton>

                  <LargeButton
                    fullWidth
                    variant="outlined"
                    onClick={navigateWithTransition("/")}
                    data-test="skip-review-button"
                  >
                    {t("review.skipForToday") ?? "Skip for today"}
                  </LargeButton>
                </Stack>
              </>
            )}
          </Stack>
        </ContentContainer>
      )}
    </PageRoot>
  );
};

export default ReviewPage;

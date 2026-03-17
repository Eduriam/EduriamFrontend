"use client";

import { ContentContainer, LargeButton, PageRoot } from "@eduriam/ui-core";
import { PREMIUM_MESSAGES, getPremiumRoute } from "app/premium/premiumMessages";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoticeBoard from "components/notices/NoticeBoard/NoticeBoard";

import StudyPlanAPI from "infrastructure/api/users/me/study-plan/StudyPlanAPI";
import useAuth from "infrastructure/services/AuthProvider";

import StudyPreview from "../(home)/components/StudyPreview/StudyPreview";
import ReviewCourseStudySession from "./components/ReviewCourseStudySession";

export interface IReviewPage {}
const REVIEW_NOTICE_TYPES = [
  "CHEST_REWARD",
  "STREAK_MILESTONE",
  "STREAK_LOST",
  "STREAK_SAVED",
] as const;

const ReviewPage: React.FC<IReviewPage> = () => {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigateWithTransition = useTransitionNavigationHandler();
  const { user } = useAuth();

  const [selectedCourseId, setSelectedCourseId] = useState<Id | undefined>(
    () => searchParams.get("courseId") ?? undefined,
  );

  useEffect(() => {
    const queryCourseId = searchParams.get("courseId") ?? undefined;
    setSelectedCourseId(queryCourseId);
  }, [searchParams]);

  const { studyPlan, isLoading: isStudyPlanLoading } =
    StudyPlanAPI.useStudyPlan();

  const upcomingReviewCourse = studyPlan?.upcomingReviewCourse;
  const queryCourseId = searchParams.get("courseId") ?? undefined;

  useEffect(() => {
    if (isStudyPlanLoading) {
      return;
    }

    if (!upcomingReviewCourse && !queryCourseId) {
      router.replace("/", { scroll: false });
    }
  }, [isStudyPlanLoading, upcomingReviewCourse, queryCourseId, router]);

  const handleStartReview = () => {
    if (!upcomingReviewCourse?.id) {
      return;
    }

    const hasNoEnergy = (user?.energy ?? 0) <= 0;
    const isPremiumUser = user?.role === "PREMIUM_USER";

    if (user && !isPremiumUser && hasNoEnergy) {
      router.replace(getPremiumRoute(PREMIUM_MESSAGES.noEnergyLeft), {
        scroll: false,
      });
      return;
    }

    setSelectedCourseId(upcomingReviewCourse.id);
    router.replace(`/review?courseId=${upcomingReviewCourse.id}`, {
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
                  imageSrc={upcomingReviewCourse?.thumbnailUrl}
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

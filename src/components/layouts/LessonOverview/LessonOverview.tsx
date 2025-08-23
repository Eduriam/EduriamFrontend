import { useTranslation } from "i18n/client";
import icons from "styles/icons";
import theme from "styles/theme";

import React from "react";

import { useRouter } from "next/navigation";

import { Toolbar, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import BottomFab from "components/atoms/BottomFab/BottomFab";
import FeedbackCard from "components/atoms/cards/FeedbackCard/FeedbackCard";
import LessonCard from "components/atoms/cards/LessonCard/LessonCard";
import LessonItemList from "components/atoms/lists/LessonItemList/LessonItemList";

import { optimisticMutationOption } from "infrastructure/api/API";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";
import { Feedback } from "infrastructure/api/user/courses/lessons/feedback/LessonFeedback";
import LessonFeedbackAPI from "infrastructure/api/user/courses/lessons/feedback/LessonFeedbackAPI";
import useAuth from "infrastructure/services/AuthProvider";

import ContentContainer from "../ContentContainer/ContentContainer";
import { defaultBackgroundGradients } from "./config";

export interface ILessonOverview {
  courseId: Id;
  lessonId: Id;
}

const LessonOverview: React.FC<ILessonOverview> = ({ lessonId, courseId }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { lesson, mutate } = LessonsAPI.useLesson(courseId, lessonId);
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { user } = useAuth();

  function handleFavoriteChange(value: boolean) {
    const data = {
      ...lesson,
      favorite: value,
    };

    mutate(async () => {
      await LessonsAPI.updateLesson(courseId, {
        id: lesson.id,
        favorite: value,
      });
      return data;
    }, optimisticMutationOption(data));
  }

  function handleVisibleChange(value: boolean) {
    const data = {
      ...lesson,
      visible: value,
    };

    mutate(async () => {
      await LessonsAPI.updateLesson(courseId, {
        id: lesson.id,
        visible: value,
      });
      return data;
    }, optimisticMutationOption(data));
  }

  async function handleFeedbackChange(value: Feedback) {
    const data = {
      ...lesson,
      feedback: value,
    };

    mutate(async () => {
      await LessonFeedbackAPI.updateLessonFeedback(courseId, lessonId, value);
      return data;
    }, optimisticMutationOption(data));
  }

  function backgroundCSS(backgroundImageUrl?: string) {
    if (backgroundImageUrl) {
      return {
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      };
    } else {
      let gradient = "90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%";
      switch (lesson.type) {
        case "VOCABULARY":
          gradient = defaultBackgroundGradients.vocabulary;
          break;
        case "GRAMMAR":
          gradient = defaultBackgroundGradients.grammar;
          break;
        case "PRONUNCIATION":
          gradient = defaultBackgroundGradients.pronunciation;
          break;
        case "SPEAKING":
          gradient = defaultBackgroundGradients.speaking;
          break;
        case "LISTENING":
          gradient = defaultBackgroundGradients.listening;
          break;
        case "READING":
          gradient = defaultBackgroundGradients.reading;
          break;
        default:
          break;
      }

      return {
        background: `linear-gradient(${gradient})`,
      };
    }
  }

  return (
    <ContentContainer>
      {lesson && (
        <Box sx={{ pt: 8, pb: 8 }}>
          <Box
            sx={{
              width: "100%",
              height: "30vh",
              position: "absolute",
              zIndex: -1,
              top: 0,
              left: 0,
            }}
          >
            {desktop && <Toolbar />}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                ...backgroundCSS(lesson.backgroundImageUrl),
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
            <LessonCard
              lesson={lesson}
              onFavoriteChange={handleFavoriteChange}
              onVisibleChange={handleVisibleChange}
            />
            {lesson.items && <LessonItemList lessonItems={lesson.items} />}
            <FeedbackCard
              feedback={lesson.feedback}
              onFeedbackChange={handleFeedbackChange}
            />
          </Box>
          {(lesson.level === "c1" || lesson.level === "c2") &&
          user?.role !== "PREMIUM_USER" ? (
            <BottomFab
              header={t("studying.premiumStudying")}
              icon={icons.lock}
              onClick={() => router.push(`/subscription`)}
            />
          ) : (
            <BottomFab
              header={t("studying.studyLesson")}
              icon={icons.startStudy}
              onClick={() => router.push(`/study?lessonId=${lessonId}`)}
            />
          )}
        </Box>
      )}
    </ContentContainer>
  );
};

export default LessonOverview;

import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FullWidthButton from "components/atoms/FullWidthButton/FullWidthButton";
import IconContainer from "components/atoms/IconContainer/IconContainer";
import LessonCard from "components/atoms/cards/LessonCard/LessonCard";

import { optimisticMutationOption } from "infrastructure/api/API";
import { LessonUpdateDTO } from "infrastructure/api/user/courses/lessons/Lessons";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

export interface INewGrammar {
  courseId: Id;
  lessonId: Id;
  onContinue: () => void;
}

const NewGrammar: React.FC<INewGrammar> = ({
  courseId,
  lessonId,
  onContinue,
}) => {
  const { t } = useTranslation("common");
  const { lesson, mutate } = LessonsAPI.useLesson(courseId, lessonId);

  function handleLessonChange(change: Omit<LessonUpdateDTO, "id">) {
    const data = { ...lesson, ...change };

    mutate(async () => {
      await LessonsAPI.updateLesson(courseId, { id: lessonId, ...change });
      return data;
    }, optimisticMutationOption(data));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        margin: "auto",
        gap: 2,
        mb: 4,
      }}
    >
      <Typography variant="subtitle1" alignSelf="center">
        {t("exercise.newGrammar")}
      </Typography>

      {lesson && (
        <Box sx={{ mb: 4 }}>
          <LessonCard
            lesson={lesson}
            onFavoriteChange={(value) =>
              handleLessonChange({ favorite: value })
            }
            onVisibleChange={(value) => handleLessonChange({ visible: value })}
          />
        </Box>
      )}

      <Box display="flex" flexDirection="column">
        <FullWidthButton
          variant="text"
          bottomOffset
          onClick={async () => {
            await handleLessonChange({ markAsLearned: true });
            onContinue();
          }}
        >
          {t("exercise.iKnowGrammar")}
        </FullWidthButton>
        <FullWidthButton
          onClick={() => onContinue()}
          endIcon={<IconContainer name={icons.next} />}
        >
          {t("exercise.continue")}
        </FullWidthButton>
      </Box>
    </Box>
  );
};

export default NewGrammar;

"use client";

import {
  ContentContainer,
  Header,
  Illustration,
  LargeButton,
  Paragraph,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export interface IQuizFinishedStepProps {
  onViewCourses: () => void;
}

const QuizFinishedStep: React.FC<IQuizFinishedStepProps> = ({
  onViewCourses,
}) => {
  const { t: tForm } = useTranslation("form");

  return (
    <ContentContainer width="small">
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Stack
          spacing={6}
          data-test="quiz-finished-section"
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", paddingBottom: "50%" }}
        >
          <Illustration name="concept" width={160} height={160} />
          <Header
            variant="section"
            text={tForm("recommendationQuiz.quizFinishedTitle")}
          />
          <Paragraph text={tForm("recommendationQuiz.quizFinishedDescription")} />
        </Stack>
      </Box>
      <LargeButton
        data-test="view-courses-button"
        onClick={onViewCourses}
        fullWidth
      >
        {tForm("recommendationQuiz.viewCourses")}
      </LargeButton>
    </ContentContainer>
  );
};

export default QuizFinishedStep;

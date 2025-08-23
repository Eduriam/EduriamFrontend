import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AudioQuestionAnswer as AudioQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

import { IQuestionAnswerComponent } from "../../../../infrastructure/api/user/courses/study-session/Exercises";
import { UserAnswer } from "../../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import useAuth from "../../../../infrastructure/services/AuthProvider";
import { removeInterpunction } from "../../../../util/functions/exercises";
import AudioInputButton from "../../AudioInputButton/AudioInputButton";

export interface IAudioQuestionAnswer extends IQuestionAnswerComponent {
  questionAnswer: AudioQuestionAnswerType;
}

const CORRECT_RATIO_THRESHOLD = 9;

const AudioQuestionAnswer: React.FC<IAudioQuestionAnswer> = ({
  displayAnswers = false,
  questionAnswer,
  onChange,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [answer, setAnswer] = useState<string | undefined>(undefined);

  const handleChange = (text: string, similarityRatio: number) => {
    setAnswer(text);
    setRating(similarityRatio);
    onChange?.(
      evaluateAnswer(
        {
          answers: [text],
          exerciseId: questionAnswer.id,
          states: ["NONE"],
          lessonItemId: questionAnswer.lessonItemId,
        },
        similarityRatio,
      ),
    );
  };

  const evaluateAnswer = (
    userAnswer: UserAnswer,
    similarityRatio: number,
  ): UserAnswer => {
    const obj = userAnswer;

    if (similarityRatio > CORRECT_RATIO_THRESHOLD) {
      obj.states[0] = "RIGHT";
    } else if (userAnswer.answers[0] === "") {
      obj.states[0] = "NONE";
    } else {
      obj.states[0] = "WRONG";
    }
    return { ...obj };
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2">
          {questionAnswer.question ?? ""}
        </Typography>
      </Box>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        {answer !== undefined && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              whiteSpace: "pre-wrap",
              width: "100%",
            }}
          >
            {answer.split(" ").map((word, i, answer) => {
              const correctWord = removeInterpunction(
                questionAnswer.answer,
              ).split(" ")[i];
              if (
                word === correctWord ||
                (rating !== undefined && rating > CORRECT_RATIO_THRESHOLD)
              ) {
                return (
                  <Box key={i}>
                    <Typography
                      sx={{ color: "success.main" }}
                      variant="subtitle2"
                      paragraph={false}
                      display="inline"
                    >
                      {correctWord}
                    </Typography>
                    {i + 1 !== answer.length && (
                      <Typography
                        variant="subtitle2"
                        paragraph={false}
                        display="inline"
                      >
                        {" "}
                      </Typography>
                    )}
                  </Box>
                );
              } else {
                return (
                  <Box key={i}>
                    <Typography
                      sx={{ color: "error.main" }}
                      variant="subtitle2"
                      paragraph={false}
                      display="inline"
                    >
                      {correctWord}
                    </Typography>
                    {i + 1 !== answer.length && (
                      <Typography
                        variant="subtitle2"
                        paragraph={false}
                        display="inline"
                      >
                        {" "}
                      </Typography>
                    )}
                  </Box>
                );
              }
            })}
          </Box>
        )}
        {rating !== undefined && <Typography>{rating}/10</Typography>}
        {user && (
          <AudioInputButton
            inputLanguage={user.selectedCourse.language2}
            disabled={displayAnswers ? true : false}
            commands={[
              {
                command: questionAnswer.answer,
                callback: (command, spokenPhrase, similarityRatio) => {
                  handleChange(
                    removeInterpunction(spokenPhrase),
                    Math.round(similarityRatio * 10),
                  );
                },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0,
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default AudioQuestionAnswer;

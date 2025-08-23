import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { IQuestionAnswerComponent } from "infrastructure/api/user/courses/study-session/Exercises";
import { BuildWordQuestionAnswer as BuildWordQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";
import { UserAnswer } from "infrastructure/api/user/courses/study-session/QuestionAttempt";

import CharacterButton, {
  CHARACTER_BUTTON_SIZE,
} from "../../CharacterButton/CharacterButton";

export interface IBuildWordQuestionAnswer extends IQuestionAnswerComponent {
  questionAnswer: BuildWordQuestionAnswerType;
}

interface LetterAnswers {
  character: string;
  originalIndex: number;
}

interface LetterOption {
  character: string;
  used: boolean;
}

const BuildWordQuestionAnswer: React.FC<IBuildWordQuestionAnswer> = ({
  onChange,
  questionAnswer,
  answerStates,
  displayAnswers = false,
}) => {
  const [letters, setLetters] = useState<Array<LetterOption>>(
    questionAnswer.letters.map((character) => {
      return { character: character, used: false };
    }),
  );
  const [answerArray, setAnswerArray] = useState<Array<LetterAnswers>>([]);

  function handleRemoveLetter(index: number) {
    const arr = [...letters];
    arr[answerArray[index].originalIndex] = {
      ...arr[answerArray[index].originalIndex],
      used: false,
    };
    setLetters(arr);

    const newAnswerArray = [...answerArray];
    newAnswerArray.splice(index, 1);
    setAnswerArray(newAnswerArray);

    onChange?.(
      evaluateAnswer({
        answers: [newAnswerArray.join("")],
        exerciseId: questionAnswer.id,
        states: ["NONE"],
        lessonItemId: questionAnswer.lessonItemId,
      }),
    );
  }

  function handleAddLetter(index: number) {
    const newAnswerArray = [
      ...answerArray,
      { character: letters[index].character, originalIndex: index },
    ];

    setAnswerArray(newAnswerArray);
    const arr = [...letters];
    arr[index] = { ...arr[index], used: true };
    setLetters(arr);

    onChange?.(
      evaluateAnswer({
        answers: [newAnswerArray.join("")],
        exerciseId: questionAnswer.id,
        states: ["NONE"],
        lessonItemId: questionAnswer.lessonItemId,
      }),
    );
  }

  function evaluateAnswer(userAnswer: UserAnswer): UserAnswer {
    const obj = userAnswer;
    if (userAnswer.answers[0] === questionAnswer.answer) {
      obj.states[0] = "RIGHT";
    } else if (userAnswer.answers[0] === "") {
      obj.states[0] = "NONE";
    } else {
      obj.states[0] = "WRONG";
    }
    return { ...obj };
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box>
        <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
          {questionAnswer.question}
        </Typography>
      </Box>
      <Paper
        variant="outlined"
        sx={{
          width: `${
            CHARACTER_BUTTON_SIZE * questionAnswer.answer.length +
            4 * (questionAnswer.answer.length - 1) + // gaps
            16 + // padding
            2 // border
          }px`,
          height: `${
            CHARACTER_BUTTON_SIZE +
            16 + // padding
            2 // border
          }px`,
          p: 1,
          outline: "error.main solid 2px",
          borderColor:
            displayAnswers && answerStates?.[0] === "RIGHT"
              ? "success.main"
              : displayAnswers && answerStates?.[0] === "WRONG"
                ? "error.main"
                : undefined,
          borderWidth: displayAnswers ? 2 : undefined,
          borderRadius: 0.4,
          boxShadow: "none",
        }}
      >
        <Box
          sx={{ minWidth: "100%", minHeight: "100%" }}
          display="flex"
          gap={0.5}
        >
          {answerArray.map((letter, i) => {
            return (
              <CharacterButton
                character={letter.character}
                onClick={() => handleRemoveLetter(i)}
                key={`answer-${i}`}
                elevated
                disabled={displayAnswers}
              />
            );
          })}
        </Box>
      </Paper>
      <Box sx={{ my: 1 }} display="flex" gap={1}>
        {letters.map((letter, i) => {
          return (
            <CharacterButton
              character={letter.character}
              onClick={() => handleAddLetter(i)}
              key={`letters-${i}`}
              elevated
              disabled={
                displayAnswers ||
                questionAnswer.answer.length === answerArray.length
              }
              used={letter.used}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default BuildWordQuestionAnswer;

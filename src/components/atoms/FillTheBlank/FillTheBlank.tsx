import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  AnswerState,
  IQuestionAnswerComponent,
} from "../../../infrastructure/api/user/courses/study-session/Exercises";
import { FillInBlankQuestionAnswer } from "../../../infrastructure/api/user/courses/study-session/QuestionAnswers";
import { UserAnswer } from "../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import { concatBlanks } from "../../../util/functions/sessions";

export interface IFillTheBlank extends IQuestionAnswerComponent {
  questionAnswer: FillInBlankQuestionAnswer;
}

const FillTheBlank: React.FC<IFillTheBlank> = ({
  questionAnswer,
  answerStates,
  onChange,
  displayAnswers = false,
}) => {
  const words = questionAnswer.answer.split(" ");

  function handleChange(index: number, answer: string) {
    const answers: Array<string> = [];
    answers[index] = answer;

    let states: Array<AnswerState> = [];
    if (!answerStates || answerStates.length === 0) {
      // Init states
      let lastIndex: number | undefined = undefined;
      questionAnswer.blankIndexes.sort().forEach((blankIndex) => {
        // Ignore neighbouring blanks
        if (lastIndex === undefined || lastIndex !== blankIndex - 1)
          states[blankIndex] = "NONE";

        lastIndex = blankIndex;
      });
    } else {
      states = [...answerStates];
    }

    onChange?.(
      evaluateAnswer({
        answers,
        states,
        exerciseId: questionAnswer.id,
        lessonItemId: questionAnswer.lessonItemId,
      }),
    );
  }

  const evaluateAnswer = (userAnswer: UserAnswer): UserAnswer => {
    const words = questionAnswer.answer.split(" ");
    userAnswer.answers.forEach((answer, i) => {
      if (answer === undefined) return;

      if (answer === concatBlanks(words, i, questionAnswer.blankIndexes)) {
        userAnswer.states[i] = "RIGHT";
      } else if (answer === "") {
        userAnswer.states[i] = "NONE";
      } else {
        userAnswer.states[i] = "WRONG";
      }
    });

    return { ...userAnswer };
  };

  return (
    <Box>
      <Box>
        <Typography variant="subtitle2">{questionAnswer.question}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          whiteSpace: "pre-wrap",
        }}
      >
        {words.map((word, i) => {
          // Merge neighbouring blanks into one
          if (
            0 < i &&
            questionAnswer.blankIndexes?.includes(i - 1) &&
            questionAnswer.blankIndexes?.includes(i)
          )
            return;

          if (questionAnswer.blankIndexes?.includes(i)) {
            return (
              <Box key={i}>
                <TextField
                  variant="outlined"
                  size="small"
                  onChange={(e) => handleChange(i, e.target.value)}
                  sx={{
                    width: "4em",
                    borderRadius: 2,
                    "& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor:
                          displayAnswers && answerStates?.[i] === "RIGHT"
                            ? "success.main"
                            : answerStates?.[i] === "WRONG"
                              ? "error.main"
                              : undefined,
                        borderWidth: 2,
                      },
                  }}
                  autoComplete="off"
                  inputProps={{ style: { paddingBottom: "8px" } }}
                  id={`${questionAnswer.id}-blank-${i}`}
                  disabled={
                    !displayAnswers ||
                    answerStates?.[i] === "NONE" ||
                    answerStates?.[i] === undefined
                      ? false
                      : true
                  }
                />

                <Typography variant="body1" paragraph={false} display="inline">
                  {" "}
                </Typography>
              </Box>
            );
          } else {
            return (
              <Box key={i}>
                <Typography variant="body1" paragraph={false} display="inline">
                  {word}
                </Typography>

                <Typography variant="body1" paragraph={false} display="inline">
                  {" "}
                </Typography>
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default FillTheBlank;

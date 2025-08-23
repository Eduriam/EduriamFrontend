import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CharacterButton from "components/atoms/CharacterButton/CharacterButton";

import {
  AnswerState,
  IQuestionAnswerComponent,
} from "infrastructure/api/user/courses/study-session/Exercises";
import { TableQuestionAnswer as TableQuestionAnswerType } from "infrastructure/api/user/courses/study-session/QuestionAnswers";

export interface ITableQuestionAnswer extends IQuestionAnswerComponent {
  questionAnswer: TableQuestionAnswerType;
  characterButtons?: Array<string>;
}

const TableQuestionAnswer: React.FC<ITableQuestionAnswer> = ({
  onChange,
  questionAnswer,
  answerStates,
  displayAnswers = false,
  characterButtons = [],
}) => {
  const [answers, setAnswers] = useState<Array<Array<string>>>(
    questionAnswer.tableRows.map((row) => {
      return row.map(() => "");
    }),
  );
  const [lastSelectedInput, setLastSelectedInput] = useState<{
    x: number;
    y: number;
  }>();

  function handleCellChange(x: number, y: number, value: string) {
    const newArray: Array<Array<string>> = [];
    for (let i = 0; i < answers.length; i++) {
      newArray[i] = answers[i].slice();
    }

    newArray[y][x] = value.toLowerCase();
    setAnswers(newArray);

    const answerStrings: Array<string> = [];
    const answerStates: Array<AnswerState> = [];

    questionAnswer.blankCellCoords.forEach((coord) => {
      const answer = newArray[coord[1]][coord[0]];
      answerStrings.push(answer);

      if (answer === questionAnswer.tableRows[coord[1]][coord[0]]) {
        answerStates.push("RIGHT");
      } else if (answer === "") {
        answerStates.push("NONE");
      } else {
        answerStates.push("WRONG");
      }
    });

    onChange?.({
      answers: answerStrings,
      exerciseId: questionAnswer.id,
      states: answerStates,
      lessonItemId: questionAnswer.lessonItemId,
    });
  }

  function getAnswerState(x: number, y: number) {
    for (let i = 0; i < questionAnswer.blankCellCoords.length; i++) {
      const coord = questionAnswer.blankCellCoords[i];

      if (coord[0] === x && coord[1] === y) {
        return answerStates?.[i] ?? "NONE";
      }
    }

    return "NONE";
  }

  function handleAddCharacter(char: string) {
    if (!lastSelectedInput) {
      return;
    }

    handleCellChange(
      lastSelectedInput.x,
      lastSelectedInput.y,
      `${answers[lastSelectedInput.y][lastSelectedInput.x]}${char}`,
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ mb: 2 }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">{questionAnswer.question}</Typography>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableBody>
              {questionAnswer.tableRows.map((row, y) => (
                <TableRow
                  key={`row-${y}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.map((cell, x) => (
                    <TableCell key={`cell-${y}-${x}`} align="left">
                      {questionAnswer.blankCellCoords.some(
                        (e) => e[0] === x && e[1] === y,
                      ) ? (
                        <TextField
                          value={(answers[y] && answers[y][x]) ?? ""}
                          variant="standard"
                          onChange={(e) =>
                            handleCellChange(x, y, e.target.value)
                          }
                          disabled={displayAnswers}
                          id={`input-${y}-${x}`}
                          onFocus={() => setLastSelectedInput({ x, y })}
                          sx={{
                            "& .MuiInputBase-root.Mui-disabled::before": {
                              borderBottomColor:
                                displayAnswers &&
                                getAnswerState(x, y) === "RIGHT"
                                  ? "success.main"
                                  : displayAnswers &&
                                      getAnswerState(x, y) === "WRONG"
                                    ? "error.main"
                                    : undefined,
                              borderBottomWidth: displayAnswers
                                ? "2px"
                                : undefined,
                              borderBottomStyle: displayAnswers
                                ? "solid"
                                : undefined,
                            },
                          }}
                        />
                      ) : (
                        <Typography>{cell}</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{ mt: 1, width: "100%" }}
        display="flex"
        justifyItems="flex-start"
      >
        {characterButtons.map((character, i) => {
          return (
            <CharacterButton
              character={character}
              onClick={() => handleAddCharacter(character)}
              key={i}
              disabled={displayAnswers}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TableQuestionAnswer;

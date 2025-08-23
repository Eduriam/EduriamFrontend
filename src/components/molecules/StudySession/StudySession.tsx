import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import icons from "styles/icons";
import theme from "styles/theme";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  IconButton,
  LinearProgress,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import IconContainer from "components/atoms/IconContainer/IconContainer";
import StudySessionProgressBar from "components/atoms/StudySessionProgressBar/StudySessionProgressBar";
import NavigationBar from "components/atoms/navigation/top-navigation-bars/NavigationBar/NavigationBar";

import { isTextExercise } from "infrastructure/api/user/courses/study-session/ExercisesGuard";
import { StudyStats } from "infrastructure/api/user/notices/Notices";
import useAuth from "infrastructure/services/AuthProvider";

import { getExplanation } from "../../../domain/models/utils/type-guards";
import { Exercise } from "../../../infrastructure/api/user/courses/study-session/Exercises";
import { QuestionAttempt } from "../../../infrastructure/api/user/courses/study-session/QuestionAttempt";
import { useScroll } from "../../../util/hooks/useScroll";
import StudyExpansionBar from "../../atoms/StudyExpansionBar/StudyExpansionBar";
import StudyExpansionContent from "../../atoms/StudyExpansionContent/StudyExpansionContent";
import ExerciseContainer from "../ExerciseContainer/ExerciseContainer";
import NewGrammar from "../exercises/NewGrammar/NewGrammar";
import NewVocabulary from "../exercises/NewVocabulary/NewVocabulary";

export interface IStudySession {
  exercises: Array<Exercise>;
  onFinish: (studyStats: StudyStats, attempts: Array<QuestionAttempt>) => void;
  onExit: () => void;
  displayExplanations?: boolean;
}

const StudySession: React.FC<IStudySession> = ({
  exercises,
  onFinish,
  onExit,
  displayExplanations = true,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [finishedSession, setFinishedSession] = useState(false);
  const [index, setIndex] = useState(0);
  const [openExpansion, setOpenExpansion] = useState(false);
  const [executeScroll, elRef] = useScroll();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const [attemptArray, setAttemptArray] = useState<Array<QuestionAttempt>>([]);
  const [exerciseQueue, setExerciseQueue] =
    useState<Array<Exercise>>(exercises);

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("error-codes");
  const redirecting = useRef(false);

  // Check if study session is empty
  useEffect(() => {
    if (!redirecting.current && exercises && exercises.length === 0) {
      redirecting.current = true;
      enqueueSnackbar(t("studySessionEmpty"), {
        variant: "success",
      });
      router.push("/");
    }
  }, [exercises, enqueueSnackbar, t, router]);

  function nextExercise() {
    if (index < exerciseQueue.length - 1) {
      setIndex(index + 1);
    }
  }

  async function handleFinished(attemptArray: Array<QuestionAttempt>) {
    setFinishedSession(true);
    onFinish(evaluateStats(attemptArray), attemptArray);
  }

  function handleContinue(
    attempts: Array<QuestionAttempt>,
    reschedule: boolean,
  ) {
    const arr = [...attemptArray, ...attempts];
    setAttemptArray(arr);

    if (reschedule) {
      setExerciseQueue((old: Array<Exercise>) => {
        return [...old, old[index]];
      });
      setIndex(index + 1);
    } else {
      nextExercise();

      if (index >= exerciseQueue.length - 1) handleFinished(arr);
    }
  }

  function toggleExpansion() {
    if (openExpansion) setOpenExpansion(false);
    else {
      setOpenExpansion(true);
    }
  }

  useEffect(() => {
    if (openExpansion) executeScroll();
  }, [openExpansion, executeScroll]);

  function renderNewVocabulary(exercise: Exercise, index: number) {
    return (
      <>
        {user && (
          <NewVocabulary
            courseId={user.selectedCourse.id}
            lessonItemId={exercise.lessonItemId}
            onContinue={() => {
              const newArray = exerciseQueue.map((exercise, i) => {
                if (i === index) {
                  return { ...exercise, isNew: false };
                }
                return exercise;
              });

              setExerciseQueue(newArray);
            }}
          />
        )}
      </>
    );
  }

  function renderNewGrammar(exercise: Exercise) {
    return (
      <>
        {user && exercise.lessonId && (
          <NewGrammar
            courseId={user.selectedCourse.id}
            lessonId={exercise.lessonId}
            onContinue={() => {
              const newArray = exerciseQueue.map((e) => {
                if (
                  exercise.lessonId &&
                  e.lessonId &&
                  e.lessonId === exercise.lessonId
                ) {
                  return { ...e, isNew: false };
                }

                return e;
              });

              setExerciseQueue(newArray);
            }}
          />
        )}
      </>
    );
  }

  function evaluateStats(attemptArray: Array<QuestionAttempt>) {
    let rightAnswers = 0;
    let wrongAnswers = 0;

    attemptArray.forEach((attempt) => {
      attempt.states.forEach((state) => {
        if (state === "RIGHT") rightAnswers++;
        else if (state === "WRONG") wrongAnswers++;
      });
    });

    return { rightAnswers, wrongAnswers };
  }

  function hasExplanation(exercise: Exercise) {
    if (isTextExercise(exercise)) {
      return exercise.explanation ? true : false;
    }

    return false;
  }

  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Toolbar />
        {desktop ? (
          <Container maxWidth="md" sx={{ mb: 2 }}>
            <Toolbar sx={{ display: "flex", alignItems: "center" }}>
              <StudySessionProgressBar
                value={index}
                maxValue={exerciseQueue.length}
              />

              <IconButton onClick={() => onExit()}>
                <IconContainer name={icons.close} />
              </IconButton>
            </Toolbar>
          </Container>
        ) : (
          <>
            <Box
              sx={{
                display: "block",
                position: "fixed",
                width: "100%",
                zIndex: 1,
              }}
            >
              <Toolbar />
              <NavigationBar
                leftIconButton={{
                  icon: icons.close,
                  onClick: () => onExit(),
                }}
                color="neutral"
              />
              <LinearProgress
                color="primary"
                variant="determinate"
                value={
                  index <= exerciseQueue.length
                    ? (index / exerciseQueue.length) * 100
                    : 100
                }
              />
            </Box>
          </>
        )}

        <Box sx={{ flexGrow: 1, pt: desktop ? undefined : 2 }}>
          <Container maxWidth="sm">
            {exerciseQueue[index] && !finishedSession && (
              <>
                {exerciseQueue[index].isNew === true &&
                exerciseQueue[index].lessonItemType === "GRAMMAR" ? (
                  renderNewGrammar(exerciseQueue[index])
                ) : exerciseQueue[index].isNew === true &&
                  exerciseQueue[index].lessonItemType === "VOCABULARY" ? (
                  renderNewVocabulary(exerciseQueue[index], index)
                ) : (
                  <ExerciseContainer
                    key={index}
                    exercise={exerciseQueue[index]}
                    onContinue={handleContinue}
                  />
                )}
              </>
            )}
          </Container>
        </Box>

        <Box flexShrink={0} sx={{ marginBottom: desktop ? 0 : "42px" }}>
          {displayExplanations &&
          exerciseQueue !== undefined &&
          exerciseQueue[index] !== undefined &&
          hasExplanation(exerciseQueue[index]) ? (
            <StudyExpansionBar onClick={toggleExpansion} open={openExpansion} />
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box sx={{ marginBottom: !openExpansion ? 0 : "100px" }}>
        {displayExplanations &&
        exerciseQueue !== undefined &&
        exerciseQueue[index] !== undefined &&
        hasExplanation(exerciseQueue[index]) ? (
          <StudyExpansionContent
            open={openExpansion}
            reference={elRef}
            content={getExplanation(exerciseQueue[index])}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default StudySession;

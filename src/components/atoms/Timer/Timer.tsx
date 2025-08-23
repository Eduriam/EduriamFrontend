import { useEffect, useState } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import theme from "../../../styles/theme";
import { timeMMSS } from "../../../util/functions/filters";
import SimpleCircularProgress from "../SimpleCircularProgress/SimpleCircularProgress";

export interface ITimer {
  milliseconds: number;
  onFinish?: () => void;
}

const Timer: React.FC<ITimer> = ({ milliseconds, onFinish }) => {
  const [value, setValue] = useState<number>(0);
  const [state, setState] = useState<"STOPPED" | "RUNNING" | "PAUSED">(
    "RUNNING",
  );
  const [finished, setFinished] = useState(false);

  function resetTimer() {
    setValue(0);
    setState("RUNNING");
  }

  useEffect(() => {
    if (finished) onFinish?.();
  }, [finished, onFinish]);

  useEffect(() => {
    if (state !== "RUNNING") return;

    const tickMilliseconds = 1000;
    const interval = setInterval(() => {
      if (value >= milliseconds) {
        setFinished(true);
        setState("STOPPED");
      }

      if (state === "RUNNING")
        setValue((value) => {
          const newValue = value + tickMilliseconds;
          return newValue >= milliseconds ? milliseconds : newValue;
        });
    }, tickMilliseconds);
    return () => clearInterval(interval);
  }, [value, milliseconds, state]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <SimpleCircularProgress
        progress={(value / milliseconds) * 100}
        color={theme.palette.primary.main}
        thickness="thin"
        size="medium"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">{timeMMSS(milliseconds - value)}</Typography>
          <Box>
            {state === "STOPPED" ? (
              <IconButton onClick={resetTimer} size="large">
                <ReplayIcon />
              </IconButton>
            ) : state === "RUNNING" ? (
              <IconButton onClick={() => setState("PAUSED")} size="large">
                <PauseIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setState("RUNNING")} size="large">
                <PlayArrowIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </SimpleCircularProgress>
    </Box>
  );
};

export default Timer;

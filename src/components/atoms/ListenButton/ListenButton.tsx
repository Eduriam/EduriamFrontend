import { useEffect, useRef, useState } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";

export interface IListenButton {
  playOnMount: boolean;
  displayProgress?: boolean;
  audioLink: string;
  onFinish?: () => void;
}

const ListenButton: React.FC<IListenButton> = ({
  playOnMount,
  displayProgress = false,
  audioLink,
  onFinish,
}) => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState<"STOPPED" | "RUNNING" | "PAUSED">(
    playOnMount ? "RUNNING" : "STOPPED",
  );
  const [finished, setFinished] = useState(false);
  const audioRef = useRef(new Audio(audioLink));

  function resetSound() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setState("STOPPED");
    setValue(0);
  }

  useEffect(() => {
    if (finished) onFinish?.();
  }, [finished, onFinish]);

  useEffect(() => {
    state === "RUNNING" ? audioRef.current.play() : audioRef.current.pause();
  }, [state]);

  useEffect(() => {
    const ref = audioRef.current;
    return () => ref.pause();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        setFinished(true);
        setState("STOPPED");
      }

      setValue(
        () => (audioRef.current.currentTime / audioRef.current.duration) * 100,
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    if (audioRef.current.paused) {
      if (audioRef.current.currentTime === audioRef.current.duration)
        resetSound();

      setState("RUNNING");
    } else setState("PAUSED");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Fab
          sx={{
            boxShadow: "0 3px 8px 0 rgba(0,0,0,0.08)",
            backgroundColor: "rgba(0,0,0,0)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
            width: "80px",
            height: "80px",
          }}
          onClick={handleButtonClick}
        >
          {state === "STOPPED" || state === "PAUSED" ? (
            <PlayArrowIcon color="primary" fontSize="large" />
          ) : (
            <PauseIcon color="primary" fontSize="large" />
          )}
        </Fab>
        {displayProgress && (
          <CircularProgress
            size={88}
            value={value}
            variant="determinate"
            color="primary"
            thickness={2}
            sx={{
              position: "absolute",
              top: "-4px",
              left: "-4px",
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ListenButton;

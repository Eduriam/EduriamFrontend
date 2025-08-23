import { useEffect, useRef, useState } from "react";

import Forward10Icon from "@mui/icons-material/Forward10";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Replay10Icon from "@mui/icons-material/Replay10";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";

export interface IAudioPlayer {
  playOnMount: boolean;
  audioLink: string;
  onFinish?: () => void;
}

const AudioPlayer: React.FC<IAudioPlayer> = ({
  playOnMount,
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
      if (audioRef.current.currentTime >= audioRef.current.duration)
        resetSound();

      setState("RUNNING");
    } else setState("PAUSED");
  };

  const handleReplay = () => {
    if (state === "STOPPED") {
      setState("RUNNING");
      audioRef.current.play();
    }

    audioRef.current.currentTime = audioRef.current.currentTime - 10;
  };

  const handleForward = () => {
    audioRef.current.currentTime = audioRef.current.currentTime + 10;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <LinearProgress value={value} variant="determinate" color="primary" />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <IconButton onClick={handleReplay} size="medium">
            <Replay10Icon color="primary" />
          </IconButton>
        </Box>
        <IconButton onClick={handleButtonClick} size="large">
          {state === "STOPPED" || state === "PAUSED" ? (
            <PlayCircleOutlineIcon color="primary" fontSize="large" />
          ) : (
            <PauseIcon color="primary" fontSize="large" />
          )}
        </IconButton>
        <Box>
          <IconButton onClick={handleForward} size="medium">
            <Forward10Icon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AudioPlayer;

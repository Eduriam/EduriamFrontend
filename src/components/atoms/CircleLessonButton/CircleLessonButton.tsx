import { Icon, IconName } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import theme from "styles/theme";
import { getLessonColor } from "util/functions/lessons";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Popover } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { LessonType } from "infrastructure/api/user/courses/lessons/Lessons";

export interface ICircleLessonButton {
  title: string;
  icon?: IconName;
  lessonType?: LessonType;
  lessonId: Id;
  active?: boolean;
  onSetActive: (lessonId: Id) => void;
}

const CircleLessonButton: React.FC<ICircleLessonButton> = ({
  icon,
  title,
  lessonType,
  lessonId,
  active,
  onSetActive,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box
          sx={{
            backgroundColor: active ? "#E0E0E0" : undefined,
            width: "102px",
            height: "102px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            sx={{
              backgroundColor: lessonType
                ? getLessonColor(lessonType)
                : undefined,
              color: "white",
              padding: "20px",
              border: "6px solid white",
              filter: "drop-shadow(0px 4px 0px rgba(212, 212, 212, 0.50));",
              "&:hover": {
                bgcolor: lessonType ? getLessonColor(lessonType) : undefined,
                padding: "22px",
              },
            }}
            onClick={handleClick}
          >
            {icon && (
              <Icon
                sx={{
                  fontSize: desktop ? 40 : 35,
                  filter: "drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.10));",
                }}
                name={icon}
              />
            )}
          </IconButton>
        </Box>
        <Typography variant="subtitle2">{title}</Typography>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: 1,
        }}
      >
        <Box sx={{ p: 1, display: "flex", gap: 1.5 }}>
          <IconButton
            sx={{
              border: "1px solid",
              borderColor: "#B9B8B8",
              borderRadius: "50%",
              padding: "6px",
            }}
            onClick={() => {
              onSetActive(lessonId);
            }}
          >
            <Icon name="arrowRight" />
          </IconButton>
          <Button
            variant="contained"
            endIcon={<Icon name="arrowRight" />}
            onClick={() => router.push(`/lessons/${lessonId}`)}
          >
            {t("navigation.open")}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default CircleLessonButton;

import { YouTubeVideoEmbed } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Lesson } from "infrastructure/api/user/courses/lessons/Lessons";

import FavoriteButton from "../../FavoriteButton/FavoriteButton";
import VisibilityButton from "../../VisibilityButton/VisibilityButton";

export interface ILessonCard {
  lesson: Lesson;
  onFavoriteChange: (value: boolean) => void;
  onVisibleChange: (value: boolean) => void;
}

const LessonCard: React.FC<ILessonCard> = ({
  lesson,
  onVisibleChange,
  onFavoriteChange,
}) => {
  const maxDescriptionLength = 250;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ flexGrow: 1 }} variant="subtitle1">
              {lesson?.name}
            </Typography>
            <VisibilityButton
              active={lesson?.visible !== undefined ? lesson.visible : true}
              onClick={() => onVisibleChange(!lesson.visible)}
            />
            <FavoriteButton
              active={lesson?.favorite !== undefined ? lesson.favorite : false}
              onClick={() => onFavoriteChange(!lesson.favorite)}
            />
          </Box>
          <Divider />
          <YouTubeVideoEmbed videoId={lesson?.videoId} />
          <Typography>
            {open
              ? lesson?.description
              : `${lesson?.description?.slice(0, maxDescriptionLength)}...`}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setOpen(!open)}>
              {open ? <>{t("other.readLess")}</> : <>{t("other.readMore")}</>}
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LessonCard;

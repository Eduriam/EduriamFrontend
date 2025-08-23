import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import ListenIconButton from "components/atoms/ListenIconButton/ListenIconButton";
import MarkdownText from "components/atoms/MarkdownText/MarkdownText";

import { LessonItem } from "infrastructure/api/user/courses/lesson-items/LessonItems";

import FavoriteButton from "../../FavoriteButton/FavoriteButton";

export interface ILessonItemCard {
  lessonItem: LessonItem;
  onFavoriteChange: (value: boolean) => void;
}

const LessonItemCard: React.FC<ILessonItemCard> = ({
  lessonItem,
  onFavoriteChange,
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography variant="subtitle1">{lessonItem.nameL2}</Typography>
              <Typography sx={{ flexGrow: 1 }} variant="subtitle2">
                {lessonItem.nameL1}
              </Typography>
            </Box>
            {lessonItem.audioUrl && (
              <ListenIconButton audioLink={lessonItem.audioUrl} />
            )}
            <FavoriteButton
              active={lessonItem.favorite}
              onClick={() => onFavoriteChange(!lessonItem.favorite)}
            />
          </Box>
          {lessonItem.description && (
            <>
              <Divider />
              <MarkdownText text={lessonItem.description}></MarkdownText>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LessonItemCard;

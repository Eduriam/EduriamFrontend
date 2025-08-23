import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import ListenIconButton from "components/atoms/ListenIconButton/ListenIconButton";

import { LessonItemSummary } from "infrastructure/api/user/courses/lesson-items/LessonItems";

import CardList from "../CardList/CardList";

export interface ILessonItemList {
  lessonItems: Array<LessonItemSummary>;
}

const LessonItemList: React.FC<ILessonItemList> = ({ lessonItems }) => {
  const router = useRouter();

  return (
    <CardList>
      {lessonItems.map((item) => {
        return (
          <ListItem
            key={item.id}
            secondaryAction={
              item.audioUrl ? (
                <ListenIconButton audioLink={item.audioUrl} />
              ) : undefined
            }
            sx={{ pr: 2 }}
          >
            <ListItemButton
              component="a"
              onClick={() => router.push(`/lesson-items/${item.id}`)}
            >
              <ListItemAvatar>
                <Avatar src={item.imageUrl} variant="rounded" />
              </ListItemAvatar>
              <ListItemText primary={item.nameL2} secondary={item.nameL1} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </CardList>
  );
};

export default LessonItemList;

import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import LessonItemsAPI from "infrastructure/api/user/courses/lesson-items/LessonItemsAPI";

import IconContainer from "../IconContainer/IconContainer";
import CardList from "../lists/CardList/CardList";

export interface ILessonItemsSearchResults {
  searchPrompt: string;
  courseId: Id;
}

const LessonItemsSearchResults: React.FC<ILessonItemsSearchResults> = ({
  searchPrompt,
  courseId,
}) => {
  const router = useRouter();
  const { lessonItems } = LessonItemsAPI.useLessonItems(courseId, {
    searchName: searchPrompt.toLowerCase(),
  });
  const { t } = useTranslation("common");

  return (
    <>
      {lessonItems && lessonItems.length > 0 ? (
        <CardList>
          {lessonItems.map((item) => {
            return (
              <ListItem key={item.id}>
                <ListItemButton
                  component="a"
                  onClick={() => router.push(`/lesson-items/${item.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar src={item.imageUrl} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText primary={item.nameL2} secondary={item.nameL1} />
                  <IconContainer name={icons.next} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </CardList>
      ) : searchPrompt ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">{t("search.noWordsFound")}</Typography>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default LessonItemsSearchResults;

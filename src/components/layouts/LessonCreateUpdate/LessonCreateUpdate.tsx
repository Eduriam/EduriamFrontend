import { Icon } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import BottomFab from "components/atoms/BottomFab/BottomFab";
import Popup from "components/atoms/Popup/Popup";
import CardList from "components/atoms/lists/CardList/CardList";
import AddVocabularyDialog from "components/molecules/AddVocabularyDialog/AddVocabularyDialog";

import { LessonItemSummary } from "infrastructure/api/user/courses/lesson-items/LessonItems";
import { LessonCreateUpdateDTO } from "infrastructure/api/user/courses/lessons/Lessons";
import LessonsAPI from "infrastructure/api/user/courses/lessons/LessonsAPI";

import ContentContainer from "../ContentContainer/ContentContainer";

export interface ILessonCreateUpdate {
  courseId: Id;
  lesson: LessonCreateUpdateDTO;
  onSave: (lesson: LessonCreateUpdateDTO) => void;
  isCreate?: boolean;
}

const LessonCreateUpdate: React.FC<ILessonCreateUpdate> = ({
  courseId,
  lesson,
  onSave,
  isCreate = false,
}) => {
  const [items, setItems] = useState<Array<LessonItemSummary>>(
    lesson.items ? lesson.items : [],
  );
  const [name, setName] = useState(lesson.name);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [description, setDescription] = useState(lesson.description);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  function displaySaveButton() {
    if (
      name !== lesson.name ||
      description !== lesson.description ||
      items?.length !== lesson.items?.length
    ) {
      return true;
    }

    const arr1 = items.slice().sort((a, b) => a.id.localeCompare(b.id));
    const arr2 = lesson.items
      .slice()
      .sort((a: LessonItemSummary, b: LessonItemSummary) =>
        a.id.localeCompare(b.id),
      );

    if (arr1 && arr2) {
      for (let i = 0; i < arr1?.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <>
      <ContentContainer>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <InputLabel id="name">{t("userLessons.lessonName")}</InputLabel>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <InputLabel id="description">
                {t("userLessons.lessonDescription")}
              </InputLabel>
              <TextField
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>

            <Popup
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              header={t("userLessons.removeLesson")}
              text={t("userLessons.removeDialogText")}
              primaryAction={{
                text: t("userActions.delete"),
                onClick: async () => {
                  await LessonsAPI.deleteCustomLesson(courseId, lesson.id);
                  router.push("/user-lessons");
                  enqueueSnackbar(t("userLessons.lessonDeleted"), {
                    variant: "success",
                  });
                },
              }}
              secondaryAction={{
                text: t("userActions.cancel"),
                onClick: () => setPopupOpen(false),
              }}
              displayCloseButton={true}
            />
            {!isCreate && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={() => setPopupOpen(true)}>
                  {t("userLessons.removeLesson")}
                </Button>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1" mb={1}>
              {t("userLessons.vocabulary")}
            </Typography>
            <IconButton onClick={() => setSearchDialogOpen(true)}>
              <Icon name="add" />
            </IconButton>
          </Box>
          <AddVocabularyDialog
            open={searchDialogOpen}
            onItemAdd={(item) => {
              setItems([...(items || []), item]);
              enqueueSnackbar(t("userLessons.wordAdded"), {
                variant: "success",
              });
            }}
            onItemRemove={(item) => {
              setItems(items.filter((e) => e.id !== item.id));
            }}
            onClose={() => setSearchDialogOpen(false)}
            items={items}
          />

          {items.length > 0 ? (
            <CardList>
              {items?.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setItems(items.filter((e) => e.id !== item.id));
                        }}
                      >
                        <Icon name="delete" />
                      </IconButton>
                    }
                    sx={{ pr: 2 }}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar src={item.imageUrl} variant="rounded" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.nameL2}
                        secondary={item.nameL1}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </CardList>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2">
                {t("userLessons.emptyLesson")}
              </Typography>
            </Box>
          )}
        </Box>
      </ContentContainer>
      {displaySaveButton() && (
        <BottomFab
          header={isCreate ? t("userActions.create") : t("userActions.save")}
          icon="check"
          onClick={() => onSave({ name, description, items, id: lesson.id })}
        />
      )}
    </>
  );
};

export default LessonCreateUpdate;

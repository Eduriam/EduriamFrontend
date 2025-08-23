import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import AddLessonItemsSearchResults from "components/atoms/AddLessonItemsSearchResults/AddLessonItemsSearchResults";
import IconContainer from "components/atoms/IconContainer/IconContainer";
import NavigationBar from "components/atoms/navigation/top-navigation-bars/NavigationBar/NavigationBar";
import ContentContainer from "components/layouts/ContentContainer/ContentContainer";

import { LessonItemSummary } from "infrastructure/api/user/courses/lesson-items/LessonItems";
import useAuth from "infrastructure/services/AuthProvider";

export interface IAddVocabularyDialog {
  open: boolean;
  onItemAdd: (lessonItem: LessonItemSummary) => void;
  onItemRemove: (lessonItem: LessonItemSummary) => void;
  onClose: () => void;
  items: Array<LessonItemSummary>;
}

const AddVocabularyDialog: React.FC<IAddVocabularyDialog> = ({
  open,
  onItemAdd,
  onItemRemove,
  onClose,
  items,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [text, setText] = useState("");
  const [searchPrompt, setSearchPrompt] = useState("");

  return (
    <Dialog fullScreen open={open}>
      <NavigationBar
        header={t("userLessons.addVocabulary")}
        leftIconButton={{
          icon: icons.back,
          onClick: onClose,
        }}
      />
      <Toolbar />
      <ContentContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box>
            <InputLabel id="text">
              {t("userLessons.searchVocabulary")}
            </InputLabel>
            <TextField
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchPrompt(text)}>
                      <IconContainer name={icons.search} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            {searchPrompt && user && (
              <AddLessonItemsSearchResults
                searchPrompt={searchPrompt}
                onItemAdd={onItemAdd}
                onItemRemove={onItemRemove}
                items={items}
                courseId={user.selectedCourse.id}
              />
            )}
          </Box>
        </Box>
      </ContentContainer>
    </Dialog>
  );
};

export default AddVocabularyDialog;

import { Icon } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";

import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Feedback } from "infrastructure/api/user/courses/lessons/feedback/LessonFeedback";

export interface IFeedbackCard {
  onFeedbackChange: (value: Feedback) => void;
  feedback?: Feedback;
}

const FeedbackCard: React.FC<IFeedbackCard> = ({
  onFeedbackChange,
  feedback,
}) => {
  const { t } = useTranslation("common");
  const [value, setValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card>
      <CardContent
        sx={{
          "&:last-child": {
            paddingBottom: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton
            onClick={() => onFeedbackChange({ state: "LIKE", text: "" })}
          >
            <Icon name="thumbUp" />
          </IconButton>
          <IconButton
            onClick={() => onFeedbackChange({ state: "DISLIKE", text: "" })}
          >
            <Icon name="thumbDown" />
          </IconButton>
        </Box>
        {feedback && feedback.state === "DISLIKE" && !feedback.text && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 1,
            }}
          >
            <Typography variant="body1">{t("feedback.header")}</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="text"
                onClick={() => {
                  onFeedbackChange({ state: "DISLIKE", text: value });
                  enqueueSnackbar(t("feedback.thanks"));
                }}
              >
                {t("other.submit")}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;

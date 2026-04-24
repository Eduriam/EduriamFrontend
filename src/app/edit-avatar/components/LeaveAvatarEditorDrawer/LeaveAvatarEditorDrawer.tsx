"use client";

import { Drawer, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ILeaveAvatarEditorDrawer {
  open: boolean;
  onClose: () => void;
  onKeepEditing: () => void;
  onDiscardChanges: () => void;
}

const LeaveAvatarEditorDrawer: React.FC<ILeaveAvatarEditorDrawer> = ({
  open,
  onClose,
  onKeepEditing,
  onDiscardChanges,
}) => {
  const { t } = useTranslation("common");

  return (
    <Drawer
      open={open}
      onClose={onClose}
      data-test="leave-avatar-editor-section"
    >
      <Stack spacing={8} sx={{ width: "100%" }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography variant="h5" textAlign="center">
            {t("avatarEditor.leave.title")}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {t("avatarEditor.leave.description")}
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ width: "100%" }}>
          <LargeButton
            variant="contained"
            onClick={onKeepEditing}
            data-test="keep-editing-button"
          >
            {t("avatarEditor.leave.keepEditing")}
          </LargeButton>
          <LargeButton
            onClick={onDiscardChanges}
            data-test="discard-changes-button"
            color="error"
            variant="text"
          >
            {t("avatarEditor.leave.discardChanges")}
          </LargeButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default LeaveAvatarEditorDrawer;

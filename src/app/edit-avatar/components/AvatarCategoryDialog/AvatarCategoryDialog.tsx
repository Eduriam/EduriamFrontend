"use client";

import {
  BasicNavbar,
  ContentContainer,
  FullscreenDialog,
  Header,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Avatar, { type AvatarDefinition } from "components/avatar/Avatar";

import AvatarEditorColorButton from "../AvatarEditorColorButton/AvatarEditorColorButton";
import AvatarEditorItemButton from "../AvatarEditorItemButton/AvatarEditorItemButton";
import {
  AVATAR_FIELD_LABELS,
  type AvatarCategory,
  getAvatarOptionColor,
} from "../avatarEditorTypes";

export interface IAvatarCategoryDialog {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  category?: AvatarCategory;
  draftAvatar: AvatarDefinition;
  onSelectOption: (field: keyof AvatarDefinition, value: string) => void;
}

const AvatarCategoryDialog: React.FC<IAvatarCategoryDialog> = ({
  open,
  onClose,
  onBack,
  category,
  draftAvatar,
  onSelectOption,
}) => {
  const { t } = useTranslation("common");

  if (!category) {
    return null;
  }

  return (
    <FullscreenDialog
      open={open}
      onClose={onClose}
      dataTest="item-category-dialog"
    >
      <BasicNavbar
        leftButton={{
          icon: "chevronLeft",
          onClick: onBack,
          dataTest: "back-button",
        }}
      />

      <ContentContainer width="small" justifyContent="flex-start" spacing={6}>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          data-test="avatar-preview-dialog-section"
          data-avatar-definition={JSON.stringify(draftAvatar)}
        >
          <Avatar definition={draftAvatar} size={180} />
        </Box>

        <Stack spacing={8} width="100%" data-test="items-category-section">
          <Stack spacing={2}>
            <Header variant="section" text={t(category.labelKey)} />
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {category.itemValues.map((value) => {
                const field = category.itemField;
                const isSelected = draftAvatar[field] === value;
                const preview = { ...draftAvatar, [field]: value };
                const color = getAvatarOptionColor(field, value);

                return color ? (
                  <AvatarEditorColorButton
                    key={`${field}-${value}`}
                    color={color}
                    selected={isSelected}
                    onClick={() => onSelectOption(field, value)}
                    data-avatar-field={field}
                    data-avatar-value={value}
                    data-test={
                      isSelected
                        ? "equipped-item-button"
                        : "unequipped-item-button"
                    }
                  />
                ) : (
                  <AvatarEditorItemButton
                    key={`${field}-${value}`}
                    preview={preview}
                    selected={isSelected}
                    onClick={() => onSelectOption(field, value)}
                    data-test={
                      isSelected
                        ? "equipped-item-button"
                        : "unequipped-item-button"
                    }
                  />
                );
              })}
            </Stack>
          </Stack>

          {category.colorField && category.colorValues.length > 0 ? (
            <Stack spacing={2}>
              <Header
                variant="section"
                text={t(
                  AVATAR_FIELD_LABELS[category.colorField] ??
                    "avatarEditor.fields.default",
                )}
              />
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                {category.colorValues.map((value) => {
                  const field = category.colorField as keyof AvatarDefinition;
                  const isSelected = draftAvatar[field] === value;
                  const color = getAvatarOptionColor(field, value);
                  const preview = { ...draftAvatar, [field]: value };

                  return color ? (
                    <AvatarEditorColorButton
                      key={`${field}-${value}`}
                      color={color}
                      selected={isSelected}
                      onClick={() => onSelectOption(field, value)}
                      data-avatar-field={field}
                      data-avatar-value={value}
                      data-test={
                        isSelected
                          ? "equipped-item-button"
                          : "unequipped-item-button"
                      }
                    />
                  ) : (
                    <AvatarEditorItemButton
                      key={`${field}-${value}`}
                      preview={preview}
                      selected={isSelected}
                      onClick={() => onSelectOption(field, value)}
                      data-test={
                        isSelected
                          ? "equipped-item-button"
                          : "unequipped-item-button"
                      }
                    />
                  );
                })}
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </ContentContainer>
    </FullscreenDialog>
  );
};

export default AvatarCategoryDialog;

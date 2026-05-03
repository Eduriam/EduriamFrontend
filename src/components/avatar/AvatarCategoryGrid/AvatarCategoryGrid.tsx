"use client";

import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AvatarDefinition } from "components/avatar/Avatar";
import AvatarCategoryButton from "components/avatar/AvatarCategoryButton/AvatarCategoryButton";
import ResponsiveItemGrid from "components/ResponsiveItemGrid/ResponsiveItemGrid";

export interface AvatarCategoryGridItem {
  id: string;
  labelKey: string;
  avatar: AvatarDefinition;
  onClick?: () => void;
  "data-test"?: string;
}

export interface IAvatarCategoryGrid {
  items: AvatarCategoryGridItem[];
  "data-test"?: string;
}

const AvatarCategoryGrid: React.FC<IAvatarCategoryGrid> = ({
  items,
  "data-test": dataTest,
}) => {
  const { t } = useTranslation("common");

  return (
    <ResponsiveItemGrid data-test={dataTest} gap={2}>
      {items.map((item) => (
        <Stack key={item.id} spacing={1}>
          <Typography variant="body1" color="text.secondary">
            {t(item.labelKey)}
          </Typography>
          <AvatarCategoryButton
            avatar={item.avatar}
            fullWidth
            onClick={item.onClick}
            data-test={item["data-test"]}
          />
        </Stack>
      ))}
    </ResponsiveItemGrid>
  );
};

export default AvatarCategoryGrid;

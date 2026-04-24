"use client";

import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { AvatarDefinition } from "components/avatar/Avatar";
import AvatarCategoryButton from "components/avatar/AvatarCategoryButton/AvatarCategoryButton";

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
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap data-test={dataTest}>
      {items.map((item) => (
        <Stack key={item.id} spacing={1}>
          <Typography variant="body1" color="text.secondary">
            {t(item.labelKey)}
          </Typography>
          <AvatarCategoryButton
            avatar={item.avatar}
            onClick={item.onClick}
            data-test={item["data-test"]}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default AvatarCategoryGrid;

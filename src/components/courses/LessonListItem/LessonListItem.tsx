"use client";

import { IconButton, IconName } from "@eduriam/ui-core";

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

export type LessonListItemStatus = "default" | "completed" | "active";

export interface ILessonListItem {
  /** Lesson or chapter title (e.g. "Basics of JavaScript"). */
  title: string;
  /** Visual and semantic state: default (play, inactive), completed (check), or active (play, current). */
  status?: LessonListItemStatus;
  /** Called when the item is clicked. */
  onClick?: () => void;
  /** Optional data attribute for E2E tests. */
  "data-test"?: string;
}

const STATUS_CONFIG: Record<
  LessonListItemStatus,
  { icon: IconName; color: "textDisabled" | "success" | "primary" }
> = {
  default: { icon: "play", color: "textDisabled" },
  completed: { icon: "check", color: "success" },
  active: { icon: "play", color: "primary" },
};

const LessonListItem: React.FC<ILessonListItem> = ({
  title,
  status = "default",
  onClick,
  "data-test": dataTest,
}) => {
  const { icon, color } = STATUS_CONFIG[status];

  return (
    <ButtonBase
      onClick={onClick}
      data-test={dataTest}
      disableRipple
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        width: "100%",
        justifyContent: "flex-start",
        paddingY: 1,
        paddingX: 3,
      }}
    >
      <span onClick={(e) => e.stopPropagation()}>
        <IconButton
          variant="outlined"
          size="large"
          icon={icon}
          color={color}
          onClick={onClick}
        />
      </span>
      <Typography variant="h6">{title}</Typography>
    </ButtonBase>
  );
};

export default LessonListItem;

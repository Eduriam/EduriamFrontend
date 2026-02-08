import { action } from "@storybook/addon-actions";

import type { ILessonListItem } from "./LessonListItem";

export const mockLessonListItemProps: ILessonListItem = {
  title: "Basics of JavaScript",
  status: "default",
  onClick: action("onClick"),
};

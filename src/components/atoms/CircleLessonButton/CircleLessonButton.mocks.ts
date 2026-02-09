import { action } from "@storybook/addon-actions";

import { ICircleLessonButton } from "./CircleLessonButton";

const base: ICircleLessonButton = {
  title: "Past Simple",
  icon: "study",
  lessonId: "dfnsjfnklfsdg",
  lessonType: "GRAMMAR",
  active: false,
  onSetActive: action("onSetActive"),
};

export const mockCircleLessonButtonProps = {
  base,
};

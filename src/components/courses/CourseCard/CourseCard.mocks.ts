import { action } from "@storybook/addon-actions";

import type { ICourseCard } from "./CourseCard";

const base: ICourseCard = {
  title: "JavaScript",
  enrolled: false,
  onClick: action("onClick"),
};

const enrolled: ICourseCard = {
  title: "JavaScript",
  enrolled: true,
  progress: 40,
  onClick: action("onClick"),
};

const premium: ICourseCard = {
  title: "JavaScript",
  enrolled: true,
  premium: true,
  progress: 40,
  onClick: action("onClick"),
};

export const mockCourseCardProps = {
  base,
  enrolled,
  premium,
};

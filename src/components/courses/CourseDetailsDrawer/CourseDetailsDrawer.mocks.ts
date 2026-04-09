import { action } from "@storybook/addon-actions";

import type { ICourseDetailsDrawer, PrerequisiteItem } from "./CourseDetailsDrawer";

const defaultPrerequisites: PrerequisiteItem[] = [
  {
    id: 101,
    productName: "HTML Beginner",
    completedAt: "2026-01-05T10:00:00.000Z",
  },
  {
    id: 102,
    productName: "CSS Advanced",
    completedAt: null,
  },
];

const defaultDescription = [
  "This course introduces JavaScript as the core programming language of the web. You'll learn how JavaScript works in the browser and how it's used to create interactive, dynamic user experiences on modern websites.",
  "Starting from the fundamentals, the course covers variables, data types, control flow, functions, and working with objects and arrays. Each concept builds on the previous one, helping you form a solid mental model of how JavaScript code is written and executed.",
  "By the end of the course, you'll be able to manipulate the DOM, respond to user events, and confidently use JavaScript to add real interactivity to web pages.",
].join("\n\n");

export const mockCourseDetailsDrawerProps: ICourseDetailsDrawer = {
  open: true,
  onClose: action("onClose"),
  prerequisites: defaultPrerequisites,
  description: defaultDescription,
};


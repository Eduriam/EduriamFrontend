import { ComponentMeta, ComponentStory } from "@storybook/react";

import CourseDetailsDrawer, {
  type ICourseDetailsDrawer,
} from "./CourseDetailsDrawer";
import { mockCourseDetailsDrawerProps } from "./CourseDetailsDrawer.mocks";

export default {
  title: "courses/CourseDetailsDrawer",
  component: CourseDetailsDrawer,
} as ComponentMeta<typeof CourseDetailsDrawer>;

const Template: ComponentStory<typeof CourseDetailsDrawer> = (args) => (
  <CourseDetailsDrawer {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCourseDetailsDrawerProps,
} as ICourseDetailsDrawer;

export const PrerequisitesOnly = Template.bind({});

PrerequisitesOnly.args = {
  ...mockCourseDetailsDrawerProps,
  prerequisites: mockCourseDetailsDrawerProps.prerequisites,
  description: "",
} as ICourseDetailsDrawer;

export const DescriptionOnly = Template.bind({});

DescriptionOnly.args = {
  ...mockCourseDetailsDrawerProps,
  prerequisites: [],
  description: mockCourseDetailsDrawerProps.description,
} as ICourseDetailsDrawer;

export const NoPrerequisites = Template.bind({});

NoPrerequisites.args = {
  ...mockCourseDetailsDrawerProps,
  prerequisites: [],
  description: mockCourseDetailsDrawerProps.description,
} as ICourseDetailsDrawer;

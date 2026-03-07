import { ComponentMeta, ComponentStory } from "@storybook/react";

import CourseListItem, { ICourseListItem } from "./CourseListItem";
import { mockCourseListItemProps } from "./CourseListItem.mocks";

export default {
  title: "pages/users/[userId]/CourseListItem",
  component: CourseListItem,
  argTypes: {},
} as ComponentMeta<typeof CourseListItem>;

const Template: ComponentStory<typeof CourseListItem> = (args) => (
  <CourseListItem {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCourseListItemProps.base,
} as ICourseListItem;

export const LearningPath = Template.bind({});

LearningPath.args = {
  ...mockCourseListItemProps.learningPath,
} as ICourseListItem;

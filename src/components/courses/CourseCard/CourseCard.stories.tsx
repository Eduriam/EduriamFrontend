import type { ComponentMeta, ComponentStory } from "@storybook/react";

import CourseCard, { type ICourseCard } from "./CourseCard";
import { mockCourseCardProps } from "./CourseCard.mocks";

export default {
  title: "courses/CourseCard",
  component: CourseCard,
  argTypes: {},
} as ComponentMeta<typeof CourseCard>;

const Template: ComponentStory<typeof CourseCard> = (args) => (
  <CourseCard {...args} />
);

export const Base = Template.bind({});
Base.args = {
  ...mockCourseCardProps.base,
} as ICourseCard;

export const Enrolled = Template.bind({});
Enrolled.args = {
  ...mockCourseCardProps.enrolled,
} as ICourseCard;

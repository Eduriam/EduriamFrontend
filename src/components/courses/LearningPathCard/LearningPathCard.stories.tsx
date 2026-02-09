import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LearningPathCard, { ILearningPathCard } from "./LearningPathCard";
import { mockLearningPathCardProps } from "./LearningPathCard.mocks";

export default {
  title: "courses/LearningPathCard",
  component: LearningPathCard,
  argTypes: {},
} as ComponentMeta<typeof LearningPathCard>;

const Template: ComponentStory<typeof LearningPathCard> = (args) => (
  <LearningPathCard {...args} />
);

export const Default = Template.bind({});
export const Enrolled = Template.bind({});

Default.args = {
  ...mockLearningPathCardProps.default,
} as ILearningPathCard;

Enrolled.args = {
  ...mockLearningPathCardProps.enrolled,
} as ILearningPathCard;

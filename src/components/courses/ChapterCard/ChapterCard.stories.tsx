import { ComponentMeta, ComponentStory } from "@storybook/react";

import ChapterCard, { type IChapterCard } from "./ChapterCard";
import { mockChapterCardProps } from "./ChapterCard.mocks";

export default {
  title: "courses/ChapterCard",
  component: ChapterCard,
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
} as ComponentMeta<typeof ChapterCard>;

const Template: ComponentStory<typeof ChapterCard> = (args) => (
  <ChapterCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockChapterCardProps,
} as IChapterCard;

export const NotStarted = Template.bind({});

NotStarted.args = {
  ...mockChapterCardProps,
  progress: 0,
} as IChapterCard;

export const Completed = Template.bind({});

Completed.args = {
  ...mockChapterCardProps,
  progress: 100,
} as IChapterCard;

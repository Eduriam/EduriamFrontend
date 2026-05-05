import type { ComponentMeta, ComponentStory } from "@storybook/react";

import StudyCard, { type IStudyCardProps } from "./StudyCard";

export default {
  title: "home/StudyCard",
  component: StudyCard,
  argTypes: {
    onStartClick: { action: "start clicked" },
  },
} as ComponentMeta<typeof StudyCard>;

const Template: ComponentStory<typeof StudyCard> = (args) => (
  <StudyCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  subtitle: "Next lesson",
  title: "Basic variables",
  buttonLabel: "Start lesson",
} as IStudyCardProps;

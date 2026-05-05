import { ComponentMeta, ComponentStory } from "@storybook/react";

import SectionCard, { type ISectionCard } from "./SectionCard";
import { mockSectionCardProps } from "./SectionCard.mocks";

export default {
  title: "courses/SectionCard",
  component: SectionCard,
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Whether the section content is expanded",
    },
    onToggle: { action: "toggled" },
  },
} as ComponentMeta<typeof SectionCard>;

const Template: ComponentStory<typeof SectionCard> = (args) => (
  <SectionCard {...args} />
);

export const Collapsed = Template.bind({});

Collapsed.args = {
  ...mockSectionCardProps,
  expanded: false,
} as ISectionCard;

export const Expanded = Template.bind({});

Expanded.args = {
  ...mockSectionCardProps,
  expanded: true,
} as ISectionCard;

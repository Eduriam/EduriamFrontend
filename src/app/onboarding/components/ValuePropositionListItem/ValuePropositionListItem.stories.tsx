import type { ComponentMeta, ComponentStory } from "@storybook/react";

import ValuePropositionListItem, {
  type IValuePropositionListItemProps,
} from "./ValuePropositionListItem";
import { mockValuePropositionListItemProps } from "./ValuePropositionListItem.mocks";

export default {
  title: "onboarding/ValuePropositionListItem",
  component: ValuePropositionListItem,
  argTypes: {},
} as ComponentMeta<typeof ValuePropositionListItem>;

const Template: ComponentStory<typeof ValuePropositionListItem> = (args) => (
  <ValuePropositionListItem {...args} />
);

export const Base = Template.bind({});
Base.args = {
  ...mockValuePropositionListItemProps.base,
} as IValuePropositionListItemProps;

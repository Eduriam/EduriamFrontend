import { ComponentMeta, ComponentStory } from "@storybook/react";

import FeedCard, { IFeedCard } from "./FeedCard";
import { mockFeedCardProps } from "./FeedCard.mocks";

export default {
  title: "app/feed/components/FeedCard",
  component: FeedCard,
  argTypes: {},
} as ComponentMeta<typeof FeedCard>;

const Template: ComponentStory<typeof FeedCard> = (args) => <FeedCard {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockFeedCardProps.base,
} as IFeedCard;

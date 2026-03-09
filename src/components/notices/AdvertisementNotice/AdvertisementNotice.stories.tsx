import { ComponentMeta, ComponentStory } from "@storybook/react";

import AdvertisementNotice, {
  type AdvertisementNoticeProps,
} from "./AdvertisementNotice";

export default {
  title: "notices/AdvertisementNotice",
  component: AdvertisementNotice,
} as ComponentMeta<typeof AdvertisementNotice>;

const Template: ComponentStory<typeof AdvertisementNotice> = (args) => (
  <AdvertisementNotice {...args} />
);

export const Base = Template.bind({});

Base.args = {
  notice: {
    id: "notice-1",
    type: "ADVERTISEMENT",
    message: "Díky reklamám můžeme aplikaci provozovat zdarma.",
  },
} as AdvertisementNoticeProps;

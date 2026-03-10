import { ComponentMeta, ComponentStory } from "@storybook/react";

import AdvertisementDialog, {
  type AdvertisementDialogProps,
} from "./AdvertisementDialog";

export default {
  title: "advertisement/AdvertisementDialog",
  component: AdvertisementDialog,
} as ComponentMeta<typeof AdvertisementDialog>;

const Template: ComponentStory<typeof AdvertisementDialog> = (args) => (
  <AdvertisementDialog {...args} />
);

export const Base = Template.bind({});

Base.args = {
  open: true,
  onContinue: () => undefined,
} as AdvertisementDialogProps;

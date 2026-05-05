import { ComponentMeta, ComponentStory } from "@storybook/react";

import EnergyDrawer, {
  type IEnergyDrawerProps,
} from "./EnergyDrawer";

export default {
  title: "pages/(home)/EnergyDrawer",
  component: EnergyDrawer,
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the drawer is open",
    },
    onClose: {
      action: "close",
      description: "Called when the drawer should close",
    },
    onUnlockUnlimited: {
      action: "unlock",
      description:
        'Called when the "Unlock unlimited energy" button is clicked',
    },
  },
} as ComponentMeta<typeof EnergyDrawer>;

const Template: ComponentStory<typeof EnergyDrawer> = (args) => (
  <EnergyDrawer {...args} />
);

export const Open: ComponentStory<typeof EnergyDrawer> = Template.bind({});

Open.args = {
  open: true,
  pointsLeft: 12,
  progressValue: 40,
} as IEnergyDrawerProps;


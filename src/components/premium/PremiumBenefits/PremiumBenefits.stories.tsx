import { ComponentMeta, ComponentStory } from "@storybook/react";

import PremiumBenefits from "./PremiumBenefits";

export default {
  title: "premium/PremiumBenefits",
  component: PremiumBenefits,
} as ComponentMeta<typeof PremiumBenefits>;

const Template: ComponentStory<typeof PremiumBenefits> = (args) => (
  <PremiumBenefits {...args} />
);

export const Base = Template.bind({});

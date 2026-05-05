import type { ComponentMeta, ComponentStory } from "@storybook/react";

import BackNavbar, { type IBackNavbarProps } from "./BackNavbar";

export default {
  title: "components/navigation/BackNavbar",
  component: BackNavbar,
} as ComponentMeta<typeof BackNavbar>;

const Template: ComponentStory<typeof BackNavbar> = (args) => (
  <BackNavbar {...args} />
);

export const Default: ComponentStory<typeof BackNavbar> = Template.bind({});
Default.args = {
  withTransition: true,
  route: "/settings",
  header: "Settings",
} as IBackNavbarProps;

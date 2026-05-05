import { ComponentMeta, ComponentStory } from "@storybook/react";

import HomepageNavbar, { type IHomepageNavbar } from "./HomepageNavbar";
import { mockHomepageNavbarProps } from "./HomepageNavbar.mocks";

export default {
  title: "pages/(home)/HomepageNavbar",
  component: HomepageNavbar,
  argTypes: {},
} as ComponentMeta<typeof HomepageNavbar>;

const Template: ComponentStory<typeof HomepageNavbar> = (args) => (
  <HomepageNavbar {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockHomepageNavbarProps,
  onStudyPlanClick: () => console.log("Study plan clicked"),
} as IHomepageNavbar;

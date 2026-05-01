import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LoadingScreen, { ILoadingScreen } from "./LoadingScreen";

export default {
  title: "shared/LoadingScreen",
  component: LoadingScreen,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof LoadingScreen>;

const Template: ComponentStory<typeof LoadingScreen> = (
  args: ILoadingScreen,
) => <LoadingScreen {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: "Checking your session...",
};

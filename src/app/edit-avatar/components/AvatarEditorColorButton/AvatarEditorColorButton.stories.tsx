import type { ComponentMeta, ComponentStory } from "@storybook/react";

import AvatarEditorColorButton, {
  type IAvatarEditorColorButton,
} from "./AvatarEditorColorButton";

export default {
  title: "pages/edit-avatar/AvatarEditorColorButton",
  component: AvatarEditorColorButton,
} as ComponentMeta<typeof AvatarEditorColorButton>;

const Template: ComponentStory<typeof AvatarEditorColorButton> = (args) => (
  <AvatarEditorColorButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "#DCD6BB",
  selected: false,
} as IAvatarEditorColorButton;

export const Selected = Template.bind({});
Selected.args = {
  color: "#DCD6BB",
  selected: true,
} as IAvatarEditorColorButton;

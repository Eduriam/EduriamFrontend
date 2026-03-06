import type { ComponentMeta, ComponentStory } from "@storybook/react";

import LeaveAvatarEditorDrawer, {
  type ILeaveAvatarEditorDrawer,
} from "./LeaveAvatarEditorDrawer";

export default {
  title: "pages/edit-avatar/LeaveAvatarEditorDrawer",
  component: LeaveAvatarEditorDrawer,
} as ComponentMeta<typeof LeaveAvatarEditorDrawer>;

const Template: ComponentStory<typeof LeaveAvatarEditorDrawer> = (args) => (
  <LeaveAvatarEditorDrawer {...args} />
);

export const Open = Template.bind({});
Open.args = {
  open: true,
  onClose: () => undefined,
  onKeepEditing: () => undefined,
  onDiscardChanges: () => undefined,
} as ILeaveAvatarEditorDrawer;

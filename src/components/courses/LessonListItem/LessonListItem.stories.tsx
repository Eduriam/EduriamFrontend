import { ComponentMeta, ComponentStory } from "@storybook/react";

import LessonListItem, {
  type ILessonListItem,
  type LessonListItemStatus,
} from "./LessonListItem";
import { mockLessonListItemProps } from "./LessonListItem.mocks";

export default {
  title: "courses/LessonListItem",
  component: LessonListItem,
  argTypes: {
    status: {
      control: "select",
      options: ["default", "completed", "active"] as LessonListItemStatus[],
      description:
        "Visual state: default (inactive play), completed (check), or active (current play)",
    },
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof LessonListItem>;

const Template: ComponentStory<typeof LessonListItem> = (args) => (
  <LessonListItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...mockLessonListItemProps,
  status: "default",
} as ILessonListItem;

export const Completed = Template.bind({});

Completed.args = {
  ...mockLessonListItemProps,
  status: "completed",
} as ILessonListItem;

export const Active = Template.bind({});

Active.args = {
  ...mockLessonListItemProps,
  status: "active",
} as ILessonListItem;

export const AllStates = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <LessonListItem
      title="Basics of JavaScript"
      status="default"
      onClick={() => {}}
    />
    <LessonListItem
      title="Basics of JavaScript"
      status="completed"
      onClick={() => {}}
    />
    <LessonListItem
      title="Basics of JavaScript"
      status="active"
      onClick={() => {}}
    />
  </div>
);

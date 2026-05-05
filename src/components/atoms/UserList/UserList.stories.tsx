import { ComponentMeta, ComponentStory } from "@storybook/react";

import UserList, { IUserList } from "./UserList";
import { mockUserListProps } from "./UserList.mocks";

export default {
  title: "atoms/lists/UserList",
  component: UserList,
  argTypes: {},
} as ComponentMeta<typeof UserList>;

const Template: ComponentStory<typeof UserList> = (args) => <UserList {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockUserListProps.base,
} as IUserList;


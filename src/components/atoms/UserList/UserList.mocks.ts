import { action } from "@storybook/addon-actions";

import { IUserList } from "./UserList";

const base: IUserList = {
  currentUserId: 100,
  onUserClick: action("onUserClick"),
  onFollowToggle: action("onFollowToggle"),
  items: [
    {
      id: 101,
      name: "User Name",
      username: "username",
      isFollowed: true,
      avatarDefinition: {
        skinColor: "light",
        eyes: "eyes_1",
        eyeColor: "darkBrown",
        expression: "expression_1",
        hair: "hair_1",
        hairColor: "darkBrown",
        clothing: "shirt_1",
        backgroundColor: "lightGray",
      },
    },
    {
      id: 102,
      name: "Another User",
      username: "another_username",
      isFollowed: false,
      avatarDefinition: {
        skinColor: "light",
        eyes: "eyes_1",
        eyeColor: "darkBrown",
        expression: "expression_1",
        hair: "hair_1",
        hairColor: "darkBrown",
        clothing: "shirt_1",
        backgroundColor: "lightGray",
      },
    },
  ],
};

export const mockUserListProps = {
  base,
};



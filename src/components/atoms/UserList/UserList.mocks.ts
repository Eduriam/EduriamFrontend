import { action } from "@storybook/addon-actions";

import {
  AvatarBackgroundColor,
  AvatarClothing,
  AvatarExpression,
  AvatarEyeColor,
  AvatarEyes,
  AvatarHair,
  AvatarHairColor,
  AvatarSkinColor,
} from "infrastructure/api/generated/models";

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
        skinColor: AvatarSkinColor.Light,
        eyes: AvatarEyes.Eyes1,
        eyeColor: AvatarEyeColor.DarkBrown,
        expression: AvatarExpression.Expression1,
        hair: AvatarHair.Hair1,
        hairColor: AvatarHairColor.DarkBrown,
        clothing: AvatarClothing.Shirt1,
        backgroundColor: AvatarBackgroundColor.LightGray,
      },
    },
    {
      id: 102,
      name: "Another User",
      username: "another_username",
      isFollowed: false,
      avatarDefinition: {
        skinColor: AvatarSkinColor.Light,
        eyes: AvatarEyes.Eyes1,
        eyeColor: AvatarEyeColor.DarkBrown,
        expression: AvatarExpression.Expression1,
        hair: AvatarHair.Hair1,
        hairColor: AvatarHairColor.DarkBrown,
        clothing: AvatarClothing.Shirt1,
        backgroundColor: AvatarBackgroundColor.LightGray,
      },
    },
  ],
};

export const mockUserListProps = {
  base,
};



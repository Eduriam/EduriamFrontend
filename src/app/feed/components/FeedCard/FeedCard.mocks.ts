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

import { IFeedCard } from "./FeedCard";

const base: IFeedCard = {
  onAddReaction: action("onAddReaction"),
  onRemoveReaction: action("onRemoveReaction"),
  feedMessage: {
    id: 1,
    author: "Pepa Okurka",
    avatarDefinition: {
      skinColor: AvatarSkinColor.Light,
      eyes: AvatarEyes.Eyes1,
      eyeColor: AvatarEyeColor.Brown,
      expression: AvatarExpression.Expression1,
      hair: AvatarHair.Hair1,
      hairColor: AvatarHairColor.MediumBrown,
      clothing: AvatarClothing.Shirt1,
      backgroundColor: AvatarBackgroundColor.LightGray,
    },
    message: "streak_milestone",
    streak: 120,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    reactions: [
      {
        counter: 12,
        reactedByUser: true,
        id: "heart",
      },
      {
        counter: 12,
        reactedByUser: false,
        id: "muscle",
      },
      {
        counter: 12,
        reactedByUser: false,
        id: "confetti",
      },
    ],
  },
};

export const mockFeedCardProps = {
  base,
};

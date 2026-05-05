import { action } from "@storybook/addon-actions";

import {
  AvatarAccessories,
  AvatarBackgroundColor,
  AvatarBeard,
  AvatarBeardColor,
  AvatarClothing,
  AvatarExpression,
  AvatarEyeColor,
  AvatarEyes,
  AvatarGlassesColor,
  FeedMessageType,
  FeedReactionType,
  AvatarHair,
  AvatarHairColor,
  AvatarHeadwear,
  AvatarSkinColor,
} from "infrastructure/api/generated/models";

import { IFeedCard } from "./FeedCard";

const base: IFeedCard = {
  onAddReaction: action("onAddReaction"),
  onRemoveReaction: action("onRemoveReaction"),
  feedMessage: {
    id: 1,
    author: "Pepa Okurka",
    avatar: {
      skinColor: AvatarSkinColor.Light,
      eyes: AvatarEyes.Eyes1,
      eyeColor: AvatarEyeColor.Brown,
      expression: AvatarExpression.Expression1,
      hair: AvatarHair.Hair1,
      hairColor: AvatarHairColor.MediumBrown,
      accessories: AvatarAccessories.None,
      glassesColor: AvatarGlassesColor.Black,
      beard: AvatarBeard.None,
      beardColor: AvatarBeardColor.DarkBrown,
      headwear: AvatarHeadwear.None,
      clothing: AvatarClothing.Shirt1,
      backgroundColor: AvatarBackgroundColor.LightGray,
    },
    message: FeedMessageType.StreakMilestone,
    streak: 120,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reactions: [
      {
        reactionType: FeedReactionType.Heart,
        count: 12,
        userReactions: [
          {
            id: 1,
            reactionType: FeedReactionType.Heart,
            userId: 101,
            reactedAt: new Date().toISOString(),
          },
        ],
      },
      {
        reactionType: FeedReactionType.Muscle,
        count: 12,
        userReactions: [],
      },
      {
        reactionType: FeedReactionType.Confetti,
        count: 12,
        userReactions: [],
      },
    ],
  },
};

export const mockFeedCardProps = {
  base,
};

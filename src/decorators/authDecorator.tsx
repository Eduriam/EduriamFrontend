import { Story } from "@storybook/react";

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
  AvatarHair,
  AvatarHairColor,
  AvatarHeadwear,
  AvatarSkinColor,
  SubscriptionStatus,
  UserRole,
} from "../infrastructure/api/generated/models";
import {
  AuthContext,
  AuthContextType,
} from "../infrastructure/services/AuthProvider";

export default function AuthDecorator(Story: Story) {
  const mock: AuthContextType = {
    loading: false,
    user: {
      id: 123,
      username: "pepaokurka",
      name: "Pepa Okurka",
      profileImageUrl: null,
      streak: 114,
      balance: 999,
      lastSessionDate: null,
      role: UserRole.PremiumUser,
      energy: 12,
      streakFreezes: 0,
      accountInitialized: true,
      activeSubscription: {
        status: SubscriptionStatus.Active,
        periodStart: new Date().toISOString(),
        periodEnd: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(), // One week from now
      },
      avatar: {
        skinColor: AvatarSkinColor.Light,
        eyes: AvatarEyes.Eyes1,
        eyeColor: AvatarEyeColor.DarkBrown,
        expression: AvatarExpression.Expression1,
        hair: AvatarHair.Hair1,
        hairColor: AvatarHairColor.DarkBrown,
        accessories: AvatarAccessories.None,
        glassesColor: AvatarGlassesColor.Black,
        beard: AvatarBeard.None,
        beardColor: AvatarBeardColor.DarkBrown,
        headwear: AvatarHeadwear.None,
        clothing: AvatarClothing.Shirt1,
        backgroundColor: AvatarBackgroundColor.LightGray,
      },
    },
    signin: () => console.log("signin"),
    signout: () => console.log("signout"),
    signUp: () => console.log("signup"),
    startGoogleAuth: () => Promise.resolve(),
    authorizeGoogleCode: async () => {
      if (!mock.user) {
        throw new Error("Mock user is not defined.");
      }

      return mock.user;
    },
    mutateUser: () => console.log("mutateUser"),
    revalidateUser: async () => {
      console.log("revalidateUser");
    },
    invalidateUser: async () => {
      console.log("invalidateUser");
    },
  };

  return (
    <div>
      <AuthContext.Provider value={mock}>
        <Story />
      </AuthContext.Provider>
    </div>
  );
}

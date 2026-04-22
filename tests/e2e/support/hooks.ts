import { After, Before } from "@cucumber/cucumber";

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
  UserRole,
  type GetUserModel,
} from "../../../src/infrastructure/api/generated/models";

import { createJwt } from "../step-definitions/util/jwt";
import {
  resetMockoonGlobalVarsToDefaults,
  setSignupAccountUninitialized,
} from "../util/mockoon-env";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {
  await resetMockoonGlobalVarsToDefaults();
  await this.initBrowser();
});

Before({ tags: "@onboarding" }, async function (this: CustomWorld) {
  if (!this.context) {
    return;
  }
  const user = {
    id: 1001,
    username: "Test user",
    name: "Test user",
    role: UserRole.User,
    streak: 0,
    balance: 0,
    energy: 40,
    streakFreezes: 0,
    accountInitialized: false,
    activeSubscription: null,
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
  } satisfies GetUserModel;
  const idToken = createJwt(60 * 60);
  const refreshToken = "test-refresh-token";
  const initScript = ({
    user,
    idToken,
    refreshToken,
  }: {
    user: GetUserModel;
    idToken: string;
    refreshToken: string;
  }) => {
    // Seed onboarding auth state only when storage is empty.
    // Do not overwrite in-scenario updates (e.g. onboarding completion).
    if (localStorage.getItem("user")) {
      return;
    }

    localStorage.setItem("idToken", JSON.stringify(idToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };
  await this.context.addInitScript(initScript, {
    user,
    idToken,
    refreshToken,
  });
});

Before({ tags: "@signup" }, async function () {
  await setSignupAccountUninitialized(true);
});

After(async function (this: CustomWorld) {
  try {
    await resetMockoonGlobalVarsToDefaults();
  } finally {
    await this.closeBrowser();
  }
});


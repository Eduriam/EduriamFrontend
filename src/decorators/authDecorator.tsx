import { Story } from "@storybook/react";

import { SubscriptionStatus } from "../infrastructure/api/generated/models";
import {
  AuthContext,
  AuthContextType,
} from "../infrastructure/services/AuthProvider";

export default function AuthDecorator(Story: Story) {
  const mock: AuthContextType = {
    loading: false,
    user: {
      id: 123,
      role: "PREMIUM_USER",
      username: "pepaokurka",
      balance: 999,
      energy: 12,
      streakFreezes: 0,
      streak: 114,
      accountInitialized: true,
      activeSubscription: {
        status: SubscriptionStatus.Active,
        periodStart: new Date().toISOString(),
        periodEnd: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(), // One week from now
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
    revalidateUser: () => console.log("revalidateUser"),
  };

  return (
    <div>
      <AuthContext.Provider value={mock}>
        <Story />
      </AuthContext.Provider>
    </div>
  );
}

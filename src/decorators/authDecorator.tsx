import { Story } from "@storybook/react";

import {
  AuthContext,
  AuthContextType,
} from "../infrastructure/services/AuthProvider";

export default function AuthDecorator(Story: Story) {
  const mock: AuthContextType = {
    loading: false,
    user: {
      id: "123",
      role: "PREMIUM_USER",
      selectedCourse: {
        id: "abcd",
        name: "Czech course",
        language: "cs",
      },
      username: "pepaokurka",
      balance: 999,
      energy: 12,
      equippedStreakFreezes: 0,
      lastSessionDate: new Date(),
      lastViewedStudyMapLevel: 2,
      streak: 114,
      accountInitialized: true,
      activeSubscription: {
        status: "ACTIVE",
        currentPeriodEnd: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        ), // One week from now
      },
    },
    login: () => console.log("login"),
    logout: () => console.log("logout"),
    signUp: () => console.log("signup"),
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

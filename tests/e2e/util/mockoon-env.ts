import * as http from "http";
import * as https from "https";

const DEFAULT_ADMIN_BASE_URL = "http://localhost:3001";
const MOCKOON_DEFAULT_GLOBAL_VARS: Record<string, string> = {
  MOCKOON_COURSE_ENROLLED: "false",
  MOCKOON_PREMIUM_COURSE: "false",
  MOCKOON_PREMIUM_LEARNING_PATH: "false",
  MOCKOON_COURSE_CERTIFICATE: "false",
  MOCKOON_UPCOMING_LESSON_DEFINED: "true",
  MOCKOON_UPCOMING_REVIEW_DEFINED: "true",
  MOCKOON_STUDY_SESSON_VARIANT: "default",
  MOCKOON_LEADERBOARD_STARTED: "true",
  MOCKOON_SHOP_ENOUGH_MONEY: "true",
  MOCKOON_SHOP_LOCKED_ITEM: "false",
  MOCKOON_AVATAR_ITEMS_PURCHASED: "false",
  MOCKOON_NOTICE_VARIANT: "empty",
  MOCKOON_FEED_VARIANT: "default",
  MOCKOON_GOOGLE_AUTH_VARIANT: "default",
  MOCKOON_CURRENT_USER_ID: "1001",
  MOCKOON_CURRENT_USER_USERNAME: "test.user",
  MOCKOON_CURRENT_USER_NAME: "Test user",
  MOCKOON_CURRENT_USER_STREAK: "0",
  MOCKOON_CURRENT_USER_BALANCE: "1000",
  MOCKOON_CURRENT_USER_ROLE: "0",
  MOCKOON_CURRENT_USER_ENERGY: "40",
  MOCKOON_CURRENT_USER_STREAK_FREEZES: "0",
  MOCKOON_CURRENT_USER_ACCOUNT_INITIALIZED: "true",
  MOCKOON_CURRENT_USER_SUBSCRIPTION_ACTIVE: "false",
  MOCKOON_CURRENT_USER_SUBSCRIPTION_STATUS: "3",
};

function getMockoonAdminBaseUrl(): string {
  return process.env.MOCKOON_ADMIN_BASE_URL || DEFAULT_ADMIN_BASE_URL;
}

function requestJson(
  url: URL,
  method: "POST" | "PUT" | "PATCH",
  body: unknown,
): Promise<void> {
  const payload = JSON.stringify(body);

  const isHttps = url.protocol === "https:";
  const client = isHttps ? https : http;

  const options: http.RequestOptions = {
    method,
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: url.pathname + url.search,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = client.request(options, (res) => {
      // Any 2xx status is treated as success
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        // Drain response to avoid holding onto the stream.
        res.on("data", () => {
          // Intentionally empty - data is ignored.
        });
        res.on("end", () => resolve());
      } else {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk.toString();
        });
        res.on("end", () => {
          reject(
            new Error(
              `Mockoon Admin API responded with ${res.statusCode}: ${data}`,
            ),
          );
        });
      }
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

export async function setMockoonGlobalVar(
  key: string,
  value: string,
): Promise<void> {
  const baseUrl = new URL(getMockoonAdminBaseUrl());
  const url = new URL("/mockoon-admin/global-vars", baseUrl);

  await requestJson(url, "POST", { key, value });
}

export async function setCourseEnrolled(enrolled: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_COURSE_ENROLLED",
    enrolled ? "true" : "false",
  );
}

export async function setCoursePremium(premium: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_PREMIUM_COURSE",
    premium ? "true" : "false",
  );
}

export async function setLearningPathPremium(premium: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_PREMIUM_LEARNING_PATH",
    premium ? "true" : "false",
  );
}

export async function setCourseCertificate(
  hasCertificate: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_COURSE_CERTIFICATE",
    hasCertificate ? "true" : "false",
  );
}

export async function setUpcomingLessonDefined(
  defined: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_UPCOMING_LESSON_DEFINED",
    defined ? "true" : "false",
  );
}

export async function setUpcomingReviewDefined(
  defined: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_UPCOMING_REVIEW_DEFINED",
    defined ? "true" : "false",
  );
}

export async function setStudySessionVariant(variant: string): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_STUDY_SESSON_VARIANT", variant);
}

export async function setLeaderboardStarted(started: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_LEADERBOARD_STARTED",
    started ? "true" : "false",
  );
}

export async function setShopEnoughMoney(
  hasEnoughMoney: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_SHOP_ENOUGH_MONEY",
    hasEnoughMoney ? "true" : "false",
  );
}

export async function setShopLockedItem(locked: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_SHOP_LOCKED_ITEM",
    locked ? "true" : "false",
  );
}

export async function setAvatarItemsPurchased(
  purchased: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_AVATAR_ITEMS_PURCHASED",
    purchased ? "true" : "false",
  );
}

export type MockoonNoticeVariant =
  | "empty"
  | "single-league-promoted"
  | "single-league-demoted"
  | "single-streak-milestone"
  | "single-streak-lost"
  | "single-streak-saved"
  | "single-achievement-earned"
  | "single-chest-reward"
  | "single-free-trial"
  | "single-free-trial-end"
  | "review-mixed"
  | "all-types";

export async function setNoticeVariant(
  variant: MockoonNoticeVariant,
): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_NOTICE_VARIANT", variant);
}

export type MockoonFeedVariant =
  | "default"
  | "empty"
  | "streak-milestone"
  | "achievement-earned"
  | "league-promoted"
  | "course-completed";

export async function setFeedVariant(
  variant: MockoonFeedVariant,
): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_FEED_VARIANT", variant);
}

export type MockoonGoogleAuthVariant =
  | "default"
  | "signin-account-not-found"
  | "signup-account-exists";

export async function setGoogleAuthVariant(
  variant: MockoonGoogleAuthVariant,
): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_GOOGLE_AUTH_VARIANT", variant);
}

export async function setCurrentUserId(id: number): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_ID", id.toString());
}

export async function setCurrentUserUsername(username: string): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_USERNAME", username);
}

export async function setCurrentUserName(name: string): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_NAME", name);
}

export async function setCurrentUserStreak(streak: number): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_STREAK", streak.toString());
}

export async function setCurrentUserBalance(balance: number): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_CURRENT_USER_BALANCE",
    balance.toString(),
  );
}

export async function setCurrentUserRole(role: number): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_ROLE", role.toString());
}

export async function setCurrentUserEnergy(energy: number): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_CURRENT_USER_ENERGY", energy.toString());
}

export async function setCurrentUserStreakFreezes(
  streakFreezes: number,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_CURRENT_USER_STREAK_FREEZES",
    streakFreezes.toString(),
  );
}

export async function setCurrentUserAccountInitialized(
  initialized: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_CURRENT_USER_ACCOUNT_INITIALIZED",
    initialized ? "true" : "false",
  );
}

export async function setCurrentUserSubscriptionActive(
  active: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_CURRENT_USER_SUBSCRIPTION_ACTIVE",
    active ? "true" : "false",
  );
}

export async function setCurrentUserSubscriptionStatus(
  status: number,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_CURRENT_USER_SUBSCRIPTION_STATUS",
    status.toString(),
  );
}

export async function setSignupAccountUninitialized(
  uninitialized: boolean,
): Promise<void> {
  await setCurrentUserAccountInitialized(!uninitialized);
}

export async function resetMockoonGlobalVarsToDefaults(): Promise<void> {
  for (const [key, value] of Object.entries(MOCKOON_DEFAULT_GLOBAL_VARS)) {
    await setMockoonGlobalVar(key, value);
  }
}

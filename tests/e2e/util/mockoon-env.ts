import * as http from "http";
import * as https from "https";

const DEFAULT_ADMIN_BASE_URL = "http://localhost:3001";
const MOCKOON_DEFAULT_GLOBAL_VARS: Record<string, string> = {
  MOCKOON_COURSE_ENROLLED: "false",
  MOCKOON_COURSE_CERTIFICATE: "false",
  MOCKOON_UPCOMING_LESSON_DEFINED: "true",
  MOCKOON_UPCOMING_REVIEW_DEFINED: "true",
  MOCKOON_STUDY_SESSON_VARIANT: "default",
  MOCKOON_LEADERBOARD_STARTED: "true",
  MOCKOON_SHOP_ENOUGH_MONEY: "true",
  MOCKOON_SHOP_LOCKED_ITEM: "false",
  MOCKOON_AVATAR_ITEMS_PURCHASED: "false",
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

export async function setShopEnoughMoney(hasEnoughMoney: boolean): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_SHOP_ENOUGH_MONEY",
    hasEnoughMoney ? "true" : "false",
  );
}

export async function setShopLockedItem(locked: boolean): Promise<void> {
  await setMockoonGlobalVar("MOCKOON_SHOP_LOCKED_ITEM", locked ? "true" : "false");
}

export async function setAvatarItemsPurchased(
  purchased: boolean,
): Promise<void> {
  await setMockoonGlobalVar(
    "MOCKOON_AVATAR_ITEMS_PURCHASED",
    purchased ? "true" : "false",
  );
}

export async function resetMockoonGlobalVarsToDefaults(): Promise<void> {
  for (const [key, value] of Object.entries(MOCKOON_DEFAULT_GLOBAL_VARS)) {
    await setMockoonGlobalVar(key, value);
  }
}

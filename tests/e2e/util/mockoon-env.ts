import * as http from "http";
import * as https from "https";

const DEFAULT_ADMIN_BASE_URL = "http://localhost:3001";

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
          // Intentionally empty – data is ignored.
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

export async function setMockoonEnvVar(
  key: string,
  value: string,
): Promise<void> {
  const baseUrl = new URL(getMockoonAdminBaseUrl());
  const url = new URL("/mockoon-admin/env-vars", baseUrl);

  await requestJson(url, "POST", { key, value });
}

export async function setLearningPathEnrolled(
  enrolled: boolean,
): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_LEARNING_PATH_ENROLLED",
    enrolled ? "true" : "false",
  );
}

export async function setCourseEnrolled(enrolled: boolean): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_COURSE_ENROLLED",
    enrolled ? "true" : "false",
  );
}

export async function setCourseCertificate(
  hasCertificate: boolean,
): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_COURSE_CERTIFICATE",
    hasCertificate ? "test-course-certificate" : "null",
  );
}

export async function setLearningPathCertificate(
  hasCertificate: boolean,
): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_LEARNING_PATH_CERTIFICATE",
    hasCertificate ? "react-developer-path-certificate" : "null",
  );
}

export async function setUpcomingLessonDefined(
  defined: boolean,
): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_UPCOMING_LESSON_DEFINED",
    defined ? "true" : "false",
  );
}

export async function setUpcomingReviewDefined(
  defined: boolean,
): Promise<void> {
  await setMockoonEnvVar(
    "MOCKOON_UPCOMING_REVIEW_DEFINED",
    defined ? "true" : "false",
  );
}

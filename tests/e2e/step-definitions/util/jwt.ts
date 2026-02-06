/**
 * Creates a simple JWT-like token for E2E testing.
 * The token is not cryptographically valid but has the correct structure
 * for the app's authentication flow.
 *
 * @param expSecondsFromNow - Number of seconds from now until the token expires
 * @returns A JWT-like string with header.payload.sig format
 */
export function createJwt(expSecondsFromNow: number): string {
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  const base64UrlEncode = (value: string) =>
    Buffer.from(value)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(JSON.stringify({ exp }));
  return `${header}.${payload}.sig`;
}

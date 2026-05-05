import { createJwt } from "../step-definitions/util/jwt";
import { CustomWorld } from "./world";

const DEFAULT_REFRESH_TOKEN = "test-refresh-token";

const setTokensScript = ({
  idToken,
  refreshToken,
}: {
  idToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem("idToken", JSON.stringify(idToken));
  localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
};

const clearTokensScript = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
};

interface SeedAuthenticatedSessionOptions {
  idToken?: string;
  refreshToken?: string;
}

export async function seedAuthenticatedSession(
  world: CustomWorld,
  options?: SeedAuthenticatedSessionOptions,
): Promise<void> {
  if (!world.page || !world.context) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  const idToken = options?.idToken ?? createJwt(60 * 60);
  const refreshToken = options?.refreshToken ?? DEFAULT_REFRESH_TOKEN;
  const args = { idToken, refreshToken };

  await world.context.addInitScript(setTokensScript, args);
  await world.page.addInitScript(setTokensScript, args);
  try {
    await world.page.evaluate(setTokensScript, args);
  } catch {
    // Ignore storage access errors on non-http origins (e.g. about:blank).
  }
}

export async function clearAuthenticatedSession(
  world: CustomWorld,
): Promise<void> {
  if (!world.page || !world.context) {
    throw new Error(
      "Page is not initialized. Make sure browser is initialized.",
    );
  }

  await world.context.addInitScript(clearTokensScript);
  await world.page.addInitScript(clearTokensScript);
  try {
    await world.page.evaluate(clearTokensScript);
  } catch {
    // Ignore storage access errors on non-http origins (e.g. about:blank).
  }
}

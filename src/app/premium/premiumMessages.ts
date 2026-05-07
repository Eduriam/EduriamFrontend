export const PREMIUM_MESSAGES = {
  queryParam: "message",
  default: "default",
  noEnergyLeft: "no-energy-left",
  certificateLocked: "certificate-locked",
  courseLocked: "course-locked",
  learningPathLocked: "learning-path-locked",
} as const;

export type PremiumMessageValue =
  (typeof PREMIUM_MESSAGES)[Exclude<keyof typeof PREMIUM_MESSAGES, "queryParam">];

const premiumMessageValues = [
  PREMIUM_MESSAGES.default,
  PREMIUM_MESSAGES.noEnergyLeft,
  PREMIUM_MESSAGES.certificateLocked,
  PREMIUM_MESSAGES.courseLocked,
  PREMIUM_MESSAGES.learningPathLocked,
] as const satisfies readonly PremiumMessageValue[];

export const getPremiumMessageFromQuery = (
  message?: string | null,
): PremiumMessageValue | undefined => {
  if (!message) {
    return undefined;
  }

  return premiumMessageValues.find(
    (premiumMessage) => premiumMessage === message,
  );
};

export const getPremiumRoute = (message?: PremiumMessageValue): string => {
  if (!message || message === PREMIUM_MESSAGES.default) {
    return "/premium";
  }

  return `/premium?${PREMIUM_MESSAGES.queryParam}=${message}`;
};

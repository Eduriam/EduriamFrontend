const errorCodes: Record<string, string> = {
  notEnoughMoney: "NOT_ENOUGH_MONEY",
  insufficientEnergy: "INSUFFICIENT_ENERGY",
  wrongEmailOrPassword: "WRONG_EMAIL_OR_PASSWORD",
  emailAddressTaken: "EMAIL_ADDDRESS_TAKEN",
  usernameTaken: "USERNAME_TAKEN",
  passwordTooShort: "PASSWORD_TOO_SHORT",
  invalidEmailAddress: "INVALID_EMAIL_ADDRESS",
  invalidUsername: "INVALID_USERNAME",
  googleAccountNotFound: "GOOGLE_ACCOUNT_NOT_FOUND",
  googleAccountExists: "GOOGLE_ACCOUNT_EXISTS",
  invalidGoogleAuthorizationUrl: "INVALID_GOOGLE_AUTHORIZATION_URL",
  externalAuthError: "EXTERNAL_AUTH_ERROR",
  emailConfirmationTokenExpired: "EMAIL_CONFIRMATION_TOKEN_EXPIRED",
};

export default errorCodes;

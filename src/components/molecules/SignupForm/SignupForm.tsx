import { Header, LargeButton, Link, TextField } from "@eduriam/ui-core";
import config from "config/config";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { Controller, useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GoogleSignupButton from "components/atoms/GoogleSignupButton/GoogleSignupButton";
import PasswordTextField from "components/molecules/PasswordTextField/PasswordTextField";

import { ApplicationProblemDetailsCode } from "infrastructure/api/generated/models";
import useAuth from "infrastructure/services/AuthProvider";
import {
  GOOGLE_AUTH_ERRORS,
  GOOGLE_AUTH_ERROR_QUERY_PARAM,
} from "infrastructure/services/auth/GoogleAuthService";

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

interface InputTypes {
  username: string;
  email: string;
  password: string;
  checked: boolean;
}

export interface ISignupForm {}

const SignupForm: React.FC<ISignupForm> = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { signUp, loading, errors: authErrors, startGoogleAuth } = useAuth();
  const { t } = useTranslation("form");
  const navigateWithTransition = useTransitionNavigationHandler();
  const searchParams = useSearchParams();
  const googleError = searchParams?.get(GOOGLE_AUTH_ERROR_QUERY_PARAM);
  const showGoogleAccountExists =
    googleError === GOOGLE_AUTH_ERRORS.accountExists;

  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    signUp(data.username, data.email, data.password);
  };

  const handleGoogleSignup = () => {
    void startGoogleAuth("signup");
  };

  const usernameHelperText =
    errors.username?.type === "required"
      ? t("error.field-is-required")
      : authErrors?.includes(ApplicationProblemDetailsCode.INVALID_USERNAME)
        ? t("error.invalid-username")
        : authErrors?.includes(ApplicationProblemDetailsCode.USERNAME_TAKEN) &&
          t("error.username-taken");
  const emailHelperText =
    errors.email?.type === "required"
      ? t("error.field-is-required")
      : errors.email?.type === "pattern" ||
          authErrors?.includes(ApplicationProblemDetailsCode.INVALID_EMAIL_ADDRESS)
        ? t("error.invalid-email-address")
        : authErrors?.includes(ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN) &&
          t("error.email-taken");
  const passwordHelperText =
    errors.password?.type === "required"
      ? t("error.field-is-required")
      : (errors.password?.type === "minLength" ||
          authErrors?.includes(ApplicationProblemDetailsCode.PASSWORD_TOO_SHORT)) &&
        t("error.password-too-short");

  return (
    <>
      <Header variant="title" text={t("auth.signup-header")} align="center" />
      <Stack
        alignItems="center"
        sx={{ width: "100%" }}
        spacing={{ xs: 18, md: 22 }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          component="form"
          id="signup-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", gap: "16px" }}
        >
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Stack data-test="signup-username-field">
                <TextField
                  id="username"
                  type="text"
                  placeholder={t("auth.name")}
                  error={
                    errors.username !== undefined ||
                    authErrors?.includes(ApplicationProblemDetailsCode.USERNAME_TAKEN) ||
                    authErrors?.includes(ApplicationProblemDetailsCode.INVALID_USERNAME)
                  }
                  helperText={usernameHelperText || undefined}
                  fullWidth
                  autoComplete="username"
                  inputProps={{ "aria-label": t("auth.name") }}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </Stack>
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: EMAIL_REGEX }}
            render={({ field }) => (
              <Stack data-test="signup-email-field">
                <TextField
                  id="email"
                  type="email"
                  placeholder={t("auth.email")}
                  error={
                    errors.email !== undefined ||
                    authErrors?.includes(ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN) ||
                    authErrors?.includes(ApplicationProblemDetailsCode.INVALID_EMAIL_ADDRESS)
                  }
                  helperText={emailHelperText || undefined}
                  fullWidth
                  autoComplete="email"
                  inputProps={{ "aria-label": t("auth.email") }}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </Stack>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 8 }}
            render={({ field }) => (
              <Stack data-test="signup-password-field">
                <PasswordTextField
                  id="password"
                  placeholder={t("auth.password")}
                  error={
                    errors.password !== undefined ||
                    authErrors?.includes(ApplicationProblemDetailsCode.PASSWORD_TOO_SHORT)
                  }
                  helperText={passwordHelperText || undefined}
                  fullWidth
                  autoComplete="new-password"
                  inputProps={{ "aria-label": t("auth.password") }}
                  visibilityToggleDataTest="signup-password-visibility-toggle-button"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </Stack>
            )}
          />
          <FormControlLabel
            control={<Checkbox {...register("checked", { required: true })} />}
            sx={{ alignItems: "center" }}
            data-test="signup-terms-checkbox"
            label={
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "#989898" }}
              >
                {t("auth.terms.0")}{" "}
                <Link
                  target="_blank"
                  href={config.termsAndConditionsUrl}
                  color="textPrimary"
                  text={t("auth.terms.1")}
                  variant="body2"
                />{" "}
                {t("auth.terms.2")}{" "}
                <Link
                  target="_blank"
                  href={config.privacyPolicyUrl}
                  color="textPrimary"
                  text={t("auth.terms.3")}
                  variant="body2"
                />
                .
              </Typography>
            }
          />
          <FormHelperText
            error={errors.checked !== undefined}
            sx={{ textAlign: "center" }}
          >
            {errors.checked?.type === "required" && t("error.agree-with-terms")}
          </FormHelperText>
        </Stack>
        <Stack sx={{ width: "100%" }} spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={3}>
            <LargeButton
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              disabled={loading || Object.keys(errors).length !== 0}
              fullWidth
              data-test="signup-submit-button"
            >
              {t("auth.signup")}
            </LargeButton>
            <GoogleSignupButton
              width="100%"
              text={t("auth.continue-with-google")}
              onClick={handleGoogleSignup}
              disabled={loading}
              dataTest="signup-google-button"
            />
            {showGoogleAccountExists && (
              <Stack
                spacing={4}
                sx={{ mt: 6, width: "100%" }}
                data-test="signup-google-account-exists-section"
              >
                <Typography variant="body1" sx={{ color: "#989898" }}>
                  {t("auth.google-signup-account-exists")}
                </Typography>
                <LargeButton
                  variant="outlined"
                  onClick={navigateWithTransition("/signin")}
                  data-test="signup-existing-account-signin-button"
                >
                  {t("auth.google-signup-signin-button")}
                </LargeButton>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" justifyContent="center" sx={{ gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {t("auth.have-an-account")}
            </Typography>
            <Link href="/signin" text={t("auth.here")} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignupForm;

import { Header, LargeButton, Link, TextField } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import type { MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GoogleSignupButton from "components/atoms/GoogleSignupButton/GoogleSignupButton";

import errorCodes from "infrastructure/api/error-codes";
import {
  GOOGLE_AUTH_ERRORS,
  GOOGLE_AUTH_ERROR_QUERY_PARAM,
} from "infrastructure/api/external-auth/ExternalAuth";
import useAuth from "infrastructure/services/AuthProvider";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

interface InputTypes {
  email: string;
  password: string;
}

export interface ISigninForm {
  onForgotPasswordClick?: () => void;
}

const SigninForm: React.FC<ISigninForm> = ({ onForgotPasswordClick }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { signin, loading, errors: authErrors, startGoogleAuth } = useAuth();
  const { t } = useTranslation("form");
  const navigateWithTransition = useTransitionNavigationHandler();
  const searchParams = useSearchParams();
  const googleError = searchParams?.get(GOOGLE_AUTH_ERROR_QUERY_PARAM);
  const showGoogleAccountNotFound =
    googleError === GOOGLE_AUTH_ERRORS.accountNotFound;

  const onSubmit = (data: { email: string; password: string }) => {
    signin(data.email, data.password);
  };

  const handleForgotPasswordClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onForgotPasswordClick) {
      return;
    }

    event.preventDefault();
    onForgotPasswordClick();
  };

  const handleGoogleSignin = () => {
    void startGoogleAuth("signin");
  };

  return (
    <>
      <Header variant="title" text={t("auth.signin-header")} align="center" />
      <Stack alignItems="center" sx={{ width: "100%", gap: "88px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          component="form"
          id="signin-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", gap: "16px" }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: EMAIL_REGEX }}
            render={({ field }) => (
              <Box data-test="signin-email-field">
                <TextField
                  id="email"
                  type="email"
                  placeholder={t("auth.email")}
                  error={errors.email !== undefined}
                  helperText={
                    errors.email?.type === "required"
                      ? t("error.field-is-required")
                      : errors.email?.type === "pattern"
                        ? t("error.invalid-email-address")
                        : undefined
                  }
                  fullWidth
                  autoComplete="email"
                  inputProps={{ "aria-label": t("auth.email") }}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </Box>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Box data-test="signin-password-field">
                <TextField
                  id="password"
                  type="password"
                  placeholder={t("auth.password")}
                  error={errors.password !== undefined}
                  helperText={
                    errors.password?.type === "required"
                      ? t("error.field-is-required")
                      : undefined
                  }
                  fullWidth
                  autoComplete="new-password"
                  inputProps={{ "aria-label": t("auth.password") }}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </Box>
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/forgot-password"
              color="textSecondary"
              text={t("auth.forgot-password")}
              onClick={handleForgotPasswordClick}
            />
          </Box>
          <FormHelperText
            error={authErrors?.includes(errorCodes.wrongEmailOrPassword)}
            sx={{ textAlign: "center" }}
          >
            {authErrors?.includes(errorCodes.wrongEmailOrPassword) && (
              <>{t("error.wrong-email-or-password")}</>
            )}
          </FormHelperText>
        </Stack>
        <Stack sx={{ width: "100%", gap: 4 }}>
          <LargeButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disabled={loading || Object.keys(errors).length !== 0}
            fullWidth
            data-test="signin-submit-button"
          >
            {t("auth.signin")}
          </LargeButton>
          <GoogleSignupButton
            width="100%"
            text={t("auth.continue-with-google")}
            onClick={handleGoogleSignin}
            disabled={loading}
            dataTest="signin-google-button"
          />
        </Stack>
      </Stack>
      {showGoogleAccountNotFound && (
        <Stack
          spacing={4}
          sx={{ mt: 6, width: "100%" }}
          data-test="signin-google-account-not-found-section"
        >
          <Typography variant="body1" sx={{ color: "#989898" }}>
            {t("auth.google-signin-account-not-found")}
          </Typography>
          <LargeButton
            variant="outlined"
            onClick={navigateWithTransition("/signup")}
            data-test="signin-google-signup-button"
          >
            {t("auth.google-signin-signup-button")}
          </LargeButton>
        </Stack>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        <Typography variant="body1" sx={{ color: "#989898" }}>
          {t("auth.dont-have-account")}
        </Typography>
        <Link href="/signup" text={t("auth.here")} />
      </Box>
    </>
  );
};

export default SigninForm;

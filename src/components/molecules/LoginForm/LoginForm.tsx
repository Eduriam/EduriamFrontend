import { Header, LargeButton, Link, TextField } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import type { MouseEvent } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GoogleSignupButton from "components/atoms/GoogleSignupButton/GoogleSignupButton";

import errorCodes from "infrastructure/api/error-codes";
import useAuth from "infrastructure/services/AuthProvider";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

interface InputTypes {
  email: string;
  password: string;
}

export interface ILoginForm {
  onForgotPasswordClick?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ onForgotPasswordClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { login, loading, errors: authErrors } = useAuth();
  const { t } = useTranslation("form");
  const onSubmit = (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  const handleForgotPasswordClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onForgotPasswordClick) {
      return;
    }

    event.preventDefault();
    onForgotPasswordClick();
  };

  return (
    <>
      <Header
        level="title"
        text={t("auth.login-header")}
        sx={{ color: "common.black", textAlign: "center" }}
      />
      <Stack alignItems="center" sx={{ width: "100%", gap: "88px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", gap: "16px" }}
        >
          <TextField
            id="email"
            type="email"
            label={t("auth.email")}
            displayLabel={false}
            placeholder={t("auth.email")}
            error={errors.email !== undefined}
            {...register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
            fullWidth
            autoComplete="email"
            inputProps={{ "aria-label": t("auth.email") }}
          />
          {errors.email && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: "left" }}
            >
              {errors.email?.type === "required"
                ? t("error.field-is-required")
                : errors.email?.type === "pattern" &&
                  t("error.invalid-email-address")}
            </Typography>
          )}
          <TextField
            id="password"
            type="password"
            label={t("auth.password")}
            displayLabel={false}
            placeholder={t("auth.password")}
            error={errors.password !== undefined}
            {...register("password", {
              required: true,
            })}
            fullWidth
            autoComplete="new-password"
            inputProps={{ "aria-label": t("auth.password") }}
          />
          {errors.password && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: "left" }}
            >
              {errors.password?.type === "required" &&
                t("error.field-is-required")}
            </Typography>
          )}
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
            variant="contained"
            disabled={loading || Object.keys(errors).length !== 0}
            fullWidth
          >
            {t("auth.login")}
          </LargeButton>
          <GoogleSignupButton width="100%" />
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        <Typography variant="body1" sx={{ color: "#989898" }}>
          {t("auth.dont-have-account")}
        </Typography>
        <Link href="/signup" text={t("auth.here")} />
      </Box>
    </>
  );
};

export default LoginForm;

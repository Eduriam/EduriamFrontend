import { Header, LargeButton, Link, TextField } from "@eduriam/ui-core";
import config from "config/config";
import { useTranslation } from "i18n/client";

import { useForm } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import GoogleSignupButton from "components/atoms/GoogleSignupButton/GoogleSignupButton";

import errorCodes from "infrastructure/api/error-codes";
import useAuth from "infrastructure/services/AuthProvider";

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { signUp, loading, errors: authErrors } = useAuth();
  const { t } = useTranslation("form");

  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    signUp(data.username, data.email, data.password);
  };

  const usernameHelperText =
    errors.username?.type === "required"
      ? t("error.field-is-required")
      : authErrors?.includes(errorCodes.invalidUsername)
        ? t("error.invalid-username")
        : authErrors?.includes(errorCodes.usernameTaken) &&
          t("error.username-taken");
  const emailHelperText =
    errors.email?.type === "required"
      ? t("error.field-is-required")
      : errors.email?.type === "pattern" ||
          authErrors?.includes(errorCodes.invalidEmailAddress)
        ? t("error.invalid-email-address")
        : authErrors?.includes(errorCodes.emailAddressTaken) &&
          t("error.email-taken");
  const passwordHelperText =
    errors.password?.type === "required"
      ? t("error.field-is-required")
      : (errors.password?.type === "minLength" ||
          authErrors?.includes(errorCodes.passwordTooShort)) &&
        t("error.password-too-short");

  return (
    <>
      <Header
        level="title"
        text={t("auth.signup-header")}
        sx={{ color: "common.black", textAlign: "center" }}
      />
      <Stack alignItems="center" sx={{ width: "100%", gap: "88px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          component="form"
          id="signup-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", gap: "16px" }}
        >
          <TextField
            displayLabel={false}
            id="username"
            type="text"
            placeholder={t("auth.username")}
            {...register("username", {
              required: true,
            })}
            fullWidth
            autoComplete="username"
            inputProps={{ "aria-label": t("auth.username") }}
          />
          {usernameHelperText ? (
            <FormHelperText
              error={
                errors.username !== undefined ||
                authErrors?.includes(errorCodes.usernameTaken) ||
                authErrors?.includes(errorCodes.invalidUsername)
              }
              sx={{ mt: 0, textAlign: "left" }}
            >
              {usernameHelperText}
            </FormHelperText>
          ) : null}
          <TextField
            displayLabel={false}
            id="email"
            type="email"
            placeholder={t("auth.email")}
            {...register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
            fullWidth
            autoComplete="email"
            inputProps={{ "aria-label": t("auth.email") }}
          />
          {emailHelperText ? (
            <FormHelperText
              error={
                errors.email !== undefined ||
                authErrors?.includes(errorCodes.emailAddressTaken) ||
                authErrors?.includes(errorCodes.invalidEmailAddress)
              }
              sx={{ mt: 0, textAlign: "left" }}
            >
              {emailHelperText}
            </FormHelperText>
          ) : null}
          <TextField
            displayLabel={false}
            id="password"
            type="password"
            placeholder={t("auth.password")}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            fullWidth
            autoComplete="new-password"
            inputProps={{ "aria-label": t("auth.password") }}
          />
          {passwordHelperText ? (
            <FormHelperText
              error={
                errors.password !== undefined ||
                authErrors?.includes(errorCodes.passwordTooShort)
              }
              sx={{ mt: 0, textAlign: "left" }}
            >
              {passwordHelperText}
            </FormHelperText>
          ) : null}
          <FormControlLabel
            control={<Checkbox {...register("checked", { required: true })} />}
            sx={{ alignItems: "center" }}
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
        <Stack sx={{ width: "100%", gap: 4 }}>
          <LargeButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disabled={loading || Object.keys(errors).length !== 0}
            fullWidth
          >
            {t("auth.signup")}
          </LargeButton>
          <GoogleSignupButton width="100%" />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ gap: 1 }}>
        <Typography variant="body1" sx={{ color: "#989898" }}>
          {t("auth.have-an-account")}
        </Typography>
        <Link href="/login" text={t("auth.here")} />
      </Stack>
    </>
  );
};

export default SignupForm;

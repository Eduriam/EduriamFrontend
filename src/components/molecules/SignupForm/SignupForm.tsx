import config from "config/config";
import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useForm } from "react-hook-form";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    signUp(data.username, data.email, data.password);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={2} sx={{ m: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t("auth.signup-header")}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        style={{ textAlign: "center" }}
      >
        <TextField
          id="username"
          type="text"
          label={t("auth.username")}
          helperText={
            errors.username?.type === "required"
              ? t("error.field-is-required")
              : authErrors?.includes(errorCodes.invalidUsername)
                ? t("error.invalid-username")
                : authErrors?.includes(errorCodes.usernameTaken) &&
                  t("error.username-taken")
          }
          error={
            errors.username !== undefined ||
            authErrors?.includes(errorCodes.usernameTaken) ||
            authErrors?.includes(errorCodes.invalidUsername)
          }
          {...register("username", {
            required: true,
          })}
          fullWidth
          autoComplete="username"
        />
        <TextField
          id="email"
          type="email"
          label={t("auth.email")}
          helperText={
            errors.email?.type === "required"
              ? t("error.field-is-required")
              : errors.email?.type === "pattern" ||
                  authErrors?.includes(errorCodes.invalidEmailAddress)
                ? t("error.invalid-email-address")
                : authErrors?.includes(errorCodes.emailAddressTaken) &&
                  t("error.email-taken")
          }
          error={
            errors.email !== undefined ||
            authErrors?.includes(errorCodes.emailAddressTaken) ||
            authErrors?.includes(errorCodes.invalidEmailAddress)
          }
          {...register("email", {
            required: true,
            pattern: EMAIL_REGEX,
          })}
          fullWidth
          autoComplete="email"
        />
        <TextField
          id="password"
          type="password"
          label={t("auth.password")}
          helperText={
            errors.password?.type === "required"
              ? t("error.field-is-required")
              : (errors.password?.type === "minLength" ||
                  authErrors?.includes(errorCodes.passwordTooShort)) &&
                t("error.password-too-short")
          }
          error={
            errors.password !== undefined ||
            authErrors?.includes(errorCodes.passwordTooShort)
          }
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          fullWidth
          autoComplete="new-password"
        />
        <FormControlLabel
          control={<Checkbox {...register("checked", { required: true })} />}
          label={
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {t("auth.terms.0")}{" "}
              <Link
                target="blank_"
                rel="noopener"
                href={config.termsAndConditionsUrl}
              >
                {t("auth.terms.1")}
              </Link>{" "}
              {t("auth.terms.2")}{" "}
              <Link
                target="blank_"
                rel="noopener"
                href={config.privacyPolicyUrl}
              >
                {t("auth.terms.3")}
              </Link>
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
        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={loading || Object.keys(errors).length !== 0}
            loading={loading}
            fullWidth={!desktop}
            size="large"
          >
            {t("auth.signup")}
          </LoadingButton>
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        {t("auth.have-an-account")} <Link href="/login">{t("auth.here")}</Link>.
      </Typography>
    </Stack>
  );
};

export default SignupForm;

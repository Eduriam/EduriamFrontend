import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import errorCodes from "infrastructure/api/error-codes";
import useAuth from "infrastructure/services/AuthProvider";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

interface InputTypes {
  email: string;
  password: string;
}

export interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { login, loading, errors: authErrors } = useAuth();
  const { t } = useTranslation("form");
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const onSubmit = (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={2} sx={{ m: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t("auth.login-header")}
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
          id="email"
          type="email"
          label={t("auth.email")}
          helperText={
            errors.email?.type === "required"
              ? t("error.field-is-required")
              : errors.email?.type === "pattern" &&
                t("error.invalid-email-address")
          }
          error={errors.email !== undefined}
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
            errors.password?.type === "required" && t("error.field-is-required")
          }
          error={errors.password !== undefined}
          {...register("password", {
            required: true,
          })}
          fullWidth
          autoComplete="new-password"
        />
        <FormHelperText
          error={authErrors?.includes(errorCodes.wrongEmailOrPassword)}
          sx={{ textAlign: "center" }}
        >
          {authErrors?.includes(errorCodes.wrongEmailOrPassword) && (
            <>
              {t("error.wrong-email-or-password")}{" "}
              <Link href="/forgot-password">{t("auth.forgot-password")}</Link>
            </>
          )}
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
            {t("auth.login")}
          </LoadingButton>
        </Box>
      </Stack>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        {t("auth.dont-have-account")}{" "}
        <Link href="/signup" style={{ textDecoration: "underline" }}>
          {t("auth.here")}
        </Link>
        .
      </Typography>
    </Stack>
  );
};

export default LoginForm;

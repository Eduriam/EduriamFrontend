import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import errorCodes from "infrastructure/api/error-codes";
import ResetPasswordAPI from "infrastructure/api/reset-password/ResetPasswordAPI";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

interface InputTypes {
  email: string;
}

export interface IForgotPasswordForm {
  onEmailSent: () => void;
}

const ForgotPasswordForm: React.FC<IForgotPasswordForm> = ({ onEmailSent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const { t } = useTranslation("form");
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [invalidEmail, setInvalidEmail] = useState(false);

  const onSubmit = (data: { email: string }) => {
    ResetPasswordAPI.resetPassword(data)
      .catch((err) => {
        if (err === errorCodes.invalidEmailAddress) {
          setInvalidEmail(true);
        }
      })
      .then(() => {
        onEmailSent();
      });
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={2} sx={{ m: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t("forgotPassword.title")}
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
              : (errors.email?.type === "pattern" || invalidEmail) &&
                t("error.invalid-email-address")
          }
          error={errors.email !== undefined || invalidEmail}
          {...register("email", {
            required: true,
            pattern: EMAIL_REGEX,
          })}
          fullWidth
          autoComplete="email"
        />
        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length !== 0}
            fullWidth={!desktop}
            size="large"
          >
            {t("forgotPassword.reset")}
          </LoadingButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ForgotPasswordForm;

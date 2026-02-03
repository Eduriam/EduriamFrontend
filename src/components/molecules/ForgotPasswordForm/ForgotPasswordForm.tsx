import { Header, LargeButton, TextField } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
    watch,
    formState: { errors },
  } = useForm<InputTypes>();
  const { ref: emailRef, ...emailField } = register("email", {
    required: true,
    pattern: EMAIL_REGEX,
  });
  const { t } = useTranslation("form");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const emailValue = watch("email");

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
    <Stack
      direction="column"
      justifyContent="center"
      sx={{ gap: "128px", width: "100%" }}
    >
      <Header
        level="title"
        text={t("forgotPassword.title")}
        sx={{
          color: "common.black",
          fontSize: 40,
          fontWeight: 700,
          lineHeight: "40px",
          textAlign: "left",
        }}
      />
      <Stack
        direction="column"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ gap: "88px", width: "100%" }}
      >
        <Stack direction="column" sx={{ gap: 2, width: "100%" }}>
          <TextField
            id="email"
            type="email"
            label={t("auth.email")}
            displayLabel={false}
            placeholder={t("auth.email")}
            error={errors.email !== undefined || invalidEmail}
            {...emailField}
            inputRef={emailRef}
            fullWidth
            autoComplete="email"
          />
          {(errors.email || invalidEmail) && (
            <Typography
              variant="caption"
              color="error"
              sx={{ textAlign: "left" }}
            >
              {errors.email?.type === "required"
                ? t("error.field-is-required")
                : (errors.email?.type === "pattern" || invalidEmail) &&
                  t("error.invalid-email-address")}
            </Typography>
          )}
        </Stack>
        <Box>
          <LargeButton
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length !== 0 || !emailValue}
            fullWidth
          >
            {t("forgotPassword.reset")}
          </LargeButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ForgotPasswordForm;

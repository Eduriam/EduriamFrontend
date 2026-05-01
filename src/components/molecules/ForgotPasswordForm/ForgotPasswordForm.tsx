import { Header, LargeButton, TextField } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { ApplicationProblemDetailsCode } from "infrastructure/api/generated/models";
import { ResetPasswordService } from "infrastructure/services/auth/ResetPasswordService";

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
    ResetPasswordService.resetPassword(data)
      .catch((err) => {
        if (err === ApplicationProblemDetailsCode.INVALID_EMAIL_ADDRESS) {
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
      <Header variant="title" text={t("forgotPassword.title")} align="center" />
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
            placeholder={t("auth.email")}
            error={errors.email !== undefined || invalidEmail}
            helperText={
              errors.email?.type === "required"
                ? t("error.field-is-required")
                : errors.email?.type === "pattern" || invalidEmail
                  ? t("error.invalid-email-address")
                  : undefined
            }
            {...emailField}
            inputRef={emailRef}
            fullWidth
            autoComplete="email"
          />
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

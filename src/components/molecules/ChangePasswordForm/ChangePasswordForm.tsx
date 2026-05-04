import { Header, LargeButton } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import PasswordTextField from "components/molecules/PasswordTextField/PasswordTextField";

import { ResetPasswordService } from "infrastructure/services/auth/ResetPasswordService";

interface InputTypes {
  password: string;
  reenterPassword: string;
}

export interface IChangePasswordForm {
  userId: number;
  resetToken: string;
  onPasswordChanged: () => void;
}

const ChangePasswordForm: React.FC<IChangePasswordForm> = ({
  userId,
  resetToken,
  onPasswordChanged,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputTypes>();
  const { ref: passwordRef, ...passwordField } = register("password", {
    required: true,
    minLength: 8,
  });
  const { ref: reenterPasswordRef, ...reenterPasswordField } = register(
    "reenterPassword",
    {
      required: true,
      validate: {
        matches: (v) => v === getValues("password"),
      },
    },
  );
  const { t } = useTranslation("form");

  const onSubmit = (data: { password: string }) => {
    ResetPasswordService.confirmResetPassword({
      password: data.password,
      resetToken,
      userId,
    }).then(() => {
      onPasswordChanged();
    });
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      sx={{ gap: "128px", width: "100%" }}
    >
      <Header variant="title" text={t("changePassword.title")} align="center" />
      <Stack
        direction="column"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ gap: "88px", width: "100%" }}
      >
        <Stack direction="column" sx={{ gap: 2, width: "100%" }}>
          <Box>
            <PasswordTextField
              id="password"
              placeholder={t("changePassword.newPassword")}
              error={errors.password !== undefined}
              helperText={
                errors.password?.type === "required"
                  ? t("error.field-is-required")
                  : errors.password?.type === "minLength"
                    ? t("error.password-too-short")
                    : undefined
              }
              {...passwordField}
              inputRef={passwordRef}
              fullWidth
              autoComplete="new-password"
            />
          </Box>
          <Box>
            <PasswordTextField
              id="reenterPassword"
              placeholder={t("changePassword.reenterPassword")}
              error={errors.reenterPassword !== undefined}
              helperText={
                errors.reenterPassword?.type === "required"
                  ? t("error.field-is-required")
                  : errors.reenterPassword?.type === "matches"
                    ? t("error.passwords-dont-match")
                    : undefined
              }
              {...reenterPasswordField}
              inputRef={reenterPasswordRef}
              fullWidth
            />
          </Box>
        </Stack>
        <Box>
          <LargeButton
            type="submit"
            variant="contained"
            disabled={
              Object.keys(errors).length !== 0 ||
              Number.isNaN(userId) ||
              resetToken === undefined
            }
            fullWidth
          >
            {t("changePassword.changePassword")}
          </LargeButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ChangePasswordForm;

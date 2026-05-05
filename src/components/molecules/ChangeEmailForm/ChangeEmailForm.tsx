import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import theme from "styles/theme";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ApplicationProblemDetailsCode } from "infrastructure/api/generated/models";
import { ChangeEmailService } from "infrastructure/services/auth/ChangeEmailService";

import { EMAIL_REGEX } from "../SignupForm/SignupForm";

interface InputTypes {
  email: string;
  reenterEmail: string;
}

export interface IChangeEmailForm {
  onEmailSent: () => void;
}

const ChangeEmailForm: React.FC<IChangeEmailForm> = ({ onEmailSent }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputTypes>();
  const { t } = useTranslation("form");
  const { enqueueSnackbar } = useSnackbar();
  const [apiErrors, setApiErrors] = useState<
    Array<typeof ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN>
  >([]);
  const [sentEmail, setSentEmail] = useState<string>();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const onSubmit = async (data: { email: string }) => {
    try {
      await ChangeEmailService.changeEmail({ newEmail: data.email });
      setSentEmail(data.email);

      onEmailSent();
    } catch (err) {
      if (err === ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN) {
        setApiErrors((errors) => [
          ...errors,
          ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN,
        ]);
      } else {
        enqueueSnackbar(t("general-error-message"), {
          variant: "error",
        });
      }
    }
  };

  return (
    <Stack direction="column" justifyContent="center" spacing={2} sx={{ m: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t("changeEmail.title")}
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
          label={t("changeEmail.newEmail")}
          helperText={
            errors.email?.type === "required"
              ? t("error.field-is-required")
              : errors.email?.type === "pattern"
                ? t("error.invalid-email-address")
                : apiErrors.includes(
                    ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN,
                  ) &&
                  getValues("email") === sentEmail &&
                  t("error.email-taken")
          }
          error={
            errors.email !== undefined ||
            (apiErrors.includes(
              ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN,
            ) &&
              getValues("email") === sentEmail)
          }
          {...register("email", {
            required: true,
            pattern: EMAIL_REGEX,
          })}
          fullWidth
        />
        <TextField
          id="reenterEmail"
          type="email"
          label={t("changeEmail.reenterEmail")}
          helperText={
            errors.reenterEmail?.type === "required"
              ? t("error.field-is-required")
              : errors.reenterEmail?.type === "pattern"
                ? t("error.invalid-email-address")
                : errors.reenterEmail?.type === "matches" &&
                  t("error.emails-dont-match")
          }
          error={errors.reenterEmail !== undefined}
          {...register("reenterEmail", {
            required: true,
            pattern: EMAIL_REGEX,
            validate: {
              matches: (v) => v === getValues("email"),
            },
          })}
          fullWidth
        />
        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={Object.keys(errors).length !== 0}
            fullWidth={!desktop}
            size="large"
          >
            {t("changeEmail.changeEmail")}
          </LoadingButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ChangeEmailForm;

import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import { type Appearance } from "@stripe/stripe-js";

import { useEffect, useMemo } from "react";

import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export interface IPaymentForm {}

const PaymentForm: React.FC<IPaymentForm> = () => {
  const elements = useElements();
  const theme = useTheme();
  const appearance = useMemo<Appearance>(
    () => ({
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorDanger: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
      },
      rules: {
        ".Label": {
          color: theme.palette.text.primary,
        },
        ".Input": {
          backgroundColor: "transparent",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          boxShadow: "none",
          color: theme.palette.text.primary,
          fontSize: "16px",
          padding: "16px",
        },
        ".Input::placeholder": {
          color: theme.palette.text.secondary,
        },
        ".Input:focus": {
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: "none",
        },
        ".Input--invalid": {
          border: `1px solid ${theme.palette.error.main}`,
          boxShadow: "none",
        },
      },
    }),
    [
      theme.palette.divider,
      theme.palette.error.main,
      theme.palette.primary.main,
      theme.palette.text.primary,
      theme.palette.text.secondary,
      theme.typography.fontFamily,
    ],
  );

  useEffect(() => {
    elements?.update({
      appearance,
    });
  }, [appearance, elements]);

  return (
    <Stack spacing={2}>
      <PaymentElement />
    </Stack>
  );
};

export default PaymentForm;

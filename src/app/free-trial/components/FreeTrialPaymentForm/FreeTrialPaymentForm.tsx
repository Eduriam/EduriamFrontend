import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export interface FreeTrialPaymentFormProps {
  onValidityChange?: (isValid: boolean) => void;
}

const FreeTrialPaymentForm: React.FC<FreeTrialPaymentFormProps> = ({
  onValidityChange,
}) => {
  const theme = useTheme();
  const [isCardNumberComplete, setIsCardNumberComplete] = useState(false);
  const [isCardExpiryComplete, setIsCardExpiryComplete] = useState(false);
  const [isCardCvvComplete, setIsCardCvvComplete] = useState(false);

  const isFormValid = useMemo(
    () => isCardNumberComplete && isCardExpiryComplete && isCardCvvComplete,
    [isCardCvvComplete, isCardExpiryComplete, isCardNumberComplete],
  );

  useEffect(() => {
    onValidityChange?.(isFormValid);
  }, [isFormValid, onValidityChange]);

  const elementOptions = useMemo(
    () => ({
      style: {
        base: {
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: "16px",
          "::placeholder": {
            color: theme.palette.text.secondary,
          },
        },
        invalid: {
          color: theme.palette.error.main,
        },
      },
    }),
    [
      theme.palette.error.main,
      theme.palette.text.primary,
      theme.palette.text.secondary,
      theme.typography.fontFamily,
    ],
  );

  return (
    <Stack spacing={2}>
      <Box data-test="card-number-field">
        <Box
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <CardNumberElement
            options={elementOptions}
            onChange={(event) => {
              setIsCardNumberComplete(event.complete);
            }}
          />
        </Box>
      </Box>

      <Stack direction="row" spacing={2}>
        <Box data-test="card-expiry-field" sx={{ width: "100%" }}>
          <Box
            sx={{
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <CardExpiryElement
              options={elementOptions}
              onChange={(event) => {
                setIsCardExpiryComplete(event.complete);
              }}
            />
          </Box>
        </Box>

        <Box data-test="card-cvv-field" sx={{ width: "100%" }}>
          <Box
            sx={{
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <CardCvcElement
              options={elementOptions}
              onChange={(event) => {
                setIsCardCvvComplete(event.complete);
              }}
            />
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default FreeTrialPaymentForm;

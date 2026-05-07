"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import theme from "styles/theme";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

import { PLAN_PRICING_OPTIONS, STRIPE_PUBLIC_KEY } from "../payment/config";

export interface IFreeTrialLayout {
  children: React.ReactNode;
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const FreeTrialLayout: React.FC<IFreeTrialLayout> = ({ children }) => {
  const options = {
    mode: "setup" as const,
    currency: PLAN_PRICING_OPTIONS.currency,
    paymentMethodTypes: ["card"],
    appearance: {
      variables: {
        colorPrimary: theme.palette.primary.main,
        colorDanger: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
      },
    },
  };

  return (
    <ProtectedRoute>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </ProtectedRoute>
  );
};

export default FreeTrialLayout;

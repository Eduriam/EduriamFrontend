"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import theme from "styles/theme";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

import { PLAN_PRICING_OPTIONS, STRIPE_PUBLIC_KEY } from "./config";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const options = {
    ...PLAN_PRICING_OPTIONS,
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

export default Layout;

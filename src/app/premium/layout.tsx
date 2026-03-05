"use client";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

export interface IPremiumLayout {
  children: React.ReactNode;
}

const PremiumLayout: React.FC<IPremiumLayout> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default PremiumLayout;

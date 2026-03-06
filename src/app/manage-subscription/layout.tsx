"use client";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;

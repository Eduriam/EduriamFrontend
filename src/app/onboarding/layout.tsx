"use client";

import { useRouter } from "next/navigation";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

import useAuth from "infrastructure/services/AuthProvider";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.accountInitialized === true) {
    router.push("/");
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;

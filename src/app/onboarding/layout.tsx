"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

import useAuth from "infrastructure/services/AuthProvider";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.accountInitialized === true) {
      router.replace("/");
    }
  }, [user?.accountInitialized, router]);

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;

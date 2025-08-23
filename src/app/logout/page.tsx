"use client";

import { useRouter } from "next/navigation";

import useAuth from "infrastructure/services/AuthProvider";

export interface ILogoutPage {}

const LogoutPage: React.FC<ILogoutPage> = () => {
  const { logout } = useAuth();
  const router = useRouter();

  logout();
  router.push("/login");

  return <></>;
};

export default LogoutPage;

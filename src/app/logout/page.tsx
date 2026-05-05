"use client";

import { useRouter } from "next/navigation";

import useAuth from "infrastructure/services/AuthProvider";

export interface ILogoutPage {}

const LogoutPage: React.FC<ILogoutPage> = () => {
  const { signout } = useAuth();
  const router = useRouter();

  signout();
  router.push("/signin");

  return <></>;
};

export default LogoutPage;

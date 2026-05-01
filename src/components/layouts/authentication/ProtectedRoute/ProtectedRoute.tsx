import { ReactNode, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import LoadingScreen from "components/loading/LoadingScreen/LoadingScreen";

import useAuth from "infrastructure/services/AuthProvider";

export interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !loading &&
      user &&
      user?.accountInitialized !== true &&
      pathname !== "/onboarding"
    ) {
      router.push("/onboarding");
    }
  }, [loading, user, pathname, router]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/welcome");
    }
  }, [loading, user, router]);

  return (
    <>
      {loading ||
      (!loading && !user) ||
      (!loading &&
        user &&
        user?.accountInitialized !== true &&
        pathname !== "/onboarding") ? (
        <LoadingScreen />
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;

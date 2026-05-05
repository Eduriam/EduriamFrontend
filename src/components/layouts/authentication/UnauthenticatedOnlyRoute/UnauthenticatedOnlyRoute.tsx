import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import LoadingScreen from "components/loading/LoadingScreen/LoadingScreen";

import useAuth from "infrastructure/services/AuthProvider";

export interface IUnauthenticatedOnlyRoute {
  children: ReactNode;
}

const UnauthenticatedOnlyRoute: React.FC<IUnauthenticatedOnlyRoute> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(user.accountInitialized ? "/" : "/onboarding");
    }
  }, [loading, user, router]);

  return <>{loading || user ? <LoadingScreen /> : children}</>;
};

export default UnauthenticatedOnlyRoute;

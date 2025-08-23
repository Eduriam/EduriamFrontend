import { useTranslation } from "i18n/client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { CircularProgress, Container } from "@mui/material";

import useAuth from "infrastructure/services/AuthProvider";

export interface IUnauthenticatedOnlyRoute {
  children: ReactNode;
}

const UnauthenticatedOnlyRoute: React.FC<IUnauthenticatedOnlyRoute> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [loading, user, router]);

  return (
    <>
      {loading || user ? (
        <Container
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          {t("loading")}
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export default UnauthenticatedOnlyRoute;

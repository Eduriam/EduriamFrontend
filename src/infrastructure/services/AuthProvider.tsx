import { useSnackbar } from "notistack";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  ApplicationProblemDetailsCode,
  type GetUserModel,
  type ApplicationProblemDetailsCode as ApplicationProblemDetailsCodeType,
} from "infrastructure/api/generated/models";
import {
  GOOGLE_AUTH_SERVICE_ERRORS,
  GOOGLE_AUTH_SOURCE_STORAGE_KEY,
  GoogleAuthSource,
} from "infrastructure/services/auth/GoogleAuthService";
import {
  clearCurrentUser,
  invalidateCurrentUser,
  patchCurrentUser,
  setCurrentUser,
  useCurrentUserState,
} from "infrastructure/services/users/currentUserState";

import { setLanguage, useTranslation } from "../../i18n/client";
import AuthManager from "../repositories/AuthManager";

export interface AuthContextType {
  user?: GetUserModel;
  loading: boolean;
  errors?: ApplicationProblemDetailsCodeType[];
  signin: (email: string, password: string) => void;
  signUp: (username: string, email: string, password: string) => void;
  startGoogleAuth: (source: GoogleAuthSource) => Promise<void>;
  authorizeGoogleCode: (
    code: string,
    source?: GoogleAuthSource,
  ) => Promise<GetUserModel>;
  signout: () => void;
  mutateUser: (userChange: Partial<GetUserModel>) => void;
  revalidateUser: () => Promise<void>;
  invalidateUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

// Source: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { user, isLoading: isCurrentUserLoading } = useCurrentUserState();
  const [errors, setError] = useState<ApplicationProblemDetailsCodeType[]>([]);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("snack");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const pathname = usePathname();

  const router = useRouter();

  // If page changes
  useEffect(() => {
    // Reset error state
    if (errors) {
      setError(() => []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    let isActive = true;
    setIsSessionLoading(true);

    AuthManager.ensureValidSession()
      .then((hasValidSession) => {
        if (!isActive) {
          return;
        }

        if (hasValidSession) {
          const shouldSkipAutoRevalidation =
            pathname === "/login-callback" ||
            (pathname === "/onboarding" && user?.accountInitialized === false);
          if (shouldSkipAutoRevalidation) {
            return;
          }

          void invalidateCurrentUser();
        } else {
          void clearCurrentUser();
        }
      })
      .finally(() => {
        if (!isActive) {
          return;
        }

        setLanguage();
        setIsSessionLoading(false);
        setInitialLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [pathname]);

  function signin(email: string, password: string) {
    setIsActionLoading(true);
    setError(() => []);

    AuthManager.signin({ email, password })
      .then((signedInUser) => {
        void setCurrentUser(signedInUser);
        void invalidateCurrentUser();
        router.push("/");
      })
      .catch((errorCode) => {
        handleError(errorCode);
      })
      .finally(() => {
        setIsActionLoading(false);
      });
  }

  function signUp(username: string, email: string, password: string) {
    setIsActionLoading(true);
    setError(() => []);

    AuthManager.signUp({ name: username, email, password })
      .then((signedUpUser) => {
        void setCurrentUser(signedUpUser);
        void invalidateCurrentUser();
        router.push("/");
      })
      .catch((errorCode) => {
        handleError(errorCode);
      })
      .finally(() => setIsActionLoading(false));
  }

  async function startGoogleAuth(source: GoogleAuthSource): Promise<void> {
    setIsActionLoading(true);
    setError(() => []);

    try {
      sessionStorage.setItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY, source);
      const authorizationUrl = await AuthManager.getGoogleAuthorizationUrl();
      window.location.assign(authorizationUrl);
    } catch (errorCode) {
      sessionStorage.removeItem(GOOGLE_AUTH_SOURCE_STORAGE_KEY);
      handleError(
        typeof errorCode === "string"
          ? errorCode
          : GOOGLE_AUTH_SERVICE_ERRORS.externalAuthError,
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  async function authorizeGoogleCode(
    code: string,
    source?: GoogleAuthSource,
  ): Promise<GetUserModel> {
    setIsActionLoading(true);
    setError(() => []);

    try {
      const authorizedUser = await AuthManager.authorizeGoogleCode({ code });
      const resolvedUser =
        source === "signup"
          ? { ...authorizedUser, accountInitialized: false }
          : authorizedUser;

      await setCurrentUser(resolvedUser);
      if (source !== "signup") {
        void invalidateCurrentUser();
      }

      return resolvedUser;
    } catch (errorCode) {
      throw typeof errorCode === "string"
        ? errorCode
        : GOOGLE_AUTH_SERVICE_ERRORS.externalAuthError;
    } finally {
      setIsActionLoading(false);
    }
  }

  function signout() {
    setIsActionLoading(true);
    setError(() => []);
    AuthManager.signout();
    void clearCurrentUser();
    setIsActionLoading(false);
    router.push("/signin");
  }

  function handleError(error: string) {
    switch (error) {
      case ApplicationProblemDetailsCode.WRONG_EMAIL_OR_PASSWORD:
      case ApplicationProblemDetailsCode.WRONG_EMAIL:
      case ApplicationProblemDetailsCode.EMAIL_NOT_CONFIRMED:
      case ApplicationProblemDetailsCode.USERNAME_TAKEN:
      case ApplicationProblemDetailsCode.EMAIL_ADDRESS_TAKEN:
      case ApplicationProblemDetailsCode.PASSWORD_TOO_SHORT:
      case ApplicationProblemDetailsCode.INVALID_EMAIL_ADDRESS:
      case ApplicationProblemDetailsCode.INVALID_USERNAME:
        setError((errors) => [
          ...errors,
          error as ApplicationProblemDetailsCodeType,
        ]);
        break;
      default:
        enqueueSnackbar(t("general-error-message"), {
          variant: "error",
        });
        break;
    }
  }

  function mutateUser(userChange: Partial<GetUserModel>) {
    void patchCurrentUser(userChange);
  }

  async function revalidateUser() {
    await invalidateCurrentUser();
  }

  async function invalidateUser() {
    await invalidateCurrentUser();
  }

  const loading = isActionLoading || isSessionLoading || isCurrentUserLoading;

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      errors,
      signin,
      signUp,
      startGoogleAuth,
      authorizeGoogleCode,
      signout,
      mutateUser,
      revalidateUser,
      invalidateUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, errors],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

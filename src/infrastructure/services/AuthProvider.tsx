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

import errorCodes from "infrastructure/api/error-codes";
import {
  GOOGLE_AUTH_SOURCE_STORAGE_KEY,
  GoogleAuthSource,
} from "infrastructure/api/external-auth/ExternalAuth";
import { UserPrivate } from "infrastructure/api/users/me/User";
import { LocalStorageManager } from "infrastructure/repositories/LocalStorageManager";
import { UserService } from "infrastructure/services/users/UserService";

import { setLanguage, useTranslation } from "../../i18n/client";
import AuthManager from "../repositories/AuthManager";

export interface AuthContextType {
  user?: UserPrivate;
  loading: boolean;
  errors?: string[];
  signin: (email: string, password: string) => void;
  signUp: (username: string, email: string, password: string) => void;
  startGoogleAuth: (source: GoogleAuthSource) => Promise<void>;
  authorizeGoogleCode: (code: string) => Promise<UserPrivate>;
  signout: () => void;
  mutateUser: (userChange: Partial<UserPrivate>) => void;
  revalidateUser: () => void;
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
  const [user, setUser] = useState<UserPrivate>();
  const [errors, setError] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

    setInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setLoading(true);

    AuthManager.getCurrentUser()
      .then((user) => {
        setUser(user);
        setLanguage();
      })
      .catch(() => {
        setLanguage();
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function signin(email: string, password: string) {
    setLoading(true);
    setError(() => []);

    AuthManager.signin({ email, password })
      .then((user) => {
        setUser(user);
        router.push("/");
      })
      .catch((errorCode) => {
        handleError(errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function signUp(username: string, email: string, password: string) {
    setLoading(true);
    setError(() => []);

    AuthManager.signUp({ username, email, password })
      .then((user) => {
        setUser(user);
        router.push("/");
      })
      .catch((errorCode) => {
        handleError(errorCode);
      })
      .finally(() => setLoading(false));
  }

  async function startGoogleAuth(source: GoogleAuthSource): Promise<void> {
    setLoading(true);
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
          : errorCodes.externalAuthError,
      );
    } finally {
      setLoading(false);
    }
  }

  async function authorizeGoogleCode(code: string): Promise<UserPrivate> {
    setLoading(true);
    setError(() => []);

    try {
      const authorizedUser = await AuthManager.authorizeGoogleCode({ code });
      setUser(authorizedUser);

      return authorizedUser;
    } catch (errorCode) {
      throw typeof errorCode === "string"
        ? errorCode
        : errorCodes.externalAuthError;
    } finally {
      setLoading(false);
    }
  }

  function signout() {
    setLoading(true);
    setError(() => []);
    AuthManager.signout();
    setUser(undefined);
    setLoading(false);
    router.push("/signin");
  }

  function handleError(error: string) {
    switch (error) {
      case errorCodes.wrongEmailOrPassword:
        setError((errors) => [...errors, errorCodes.wrongEmailOrPassword]);
        break;
      case errorCodes.usernameTaken:
        setError((errors) => [...errors, errorCodes.usernameTaken]);
        break;
      case errorCodes.emailAddressTaken:
        setError((errors) => [...errors, errorCodes.emailAddressTaken]);
        break;
      case errorCodes.passwordTooShort:
        setError((errors) => [...errors, errorCodes.passwordTooShort]);
        break;
      case errorCodes.invalidEmailAddress:
        setError((errors) => [...errors, errorCodes.invalidEmailAddress]);
        break;
      case errorCodes.invalidUsername:
        setError((errors) => [...errors, errorCodes.invalidUsername]);
        break;
      default:
        enqueueSnackbar(t("general-error-message"), {
          variant: "error",
        });
        break;
    }
  }

  function mutateUser(userChange: Partial<UserPrivate>) {
    const currentUser =
      user ?? LocalStorageManager.getItem<UserPrivate>("user");
    if (!currentUser) {
      return;
    }

    const newUser = { ...currentUser, ...userChange };

    setUser(newUser);
    LocalStorageManager.setItem<UserPrivate>("user", newUser);
  }

  async function revalidateUser() {
    const user = await UserService.getUser();

    setUser(user);
    LocalStorageManager.setItem<UserPrivate>("user", user);
  }

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

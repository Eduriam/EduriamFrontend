"use client";

import { ThemeProvider } from "@mui/material/styles";
import { getAppTheme } from "styles/theme";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import SettingsAPI from "infrastructure/api/user/settings/SettingsAPI";
import type { ThemeMode } from "infrastructure/api/user/settings/Settings";

import useAuth from "./AuthProvider";

const THEME_MODE_STORAGE_KEY = "themeMode";

interface ThemeModeContextType {
  mode: ThemeMode;
  resolvedMode: "dark" | "light";
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "system",
  resolvedMode: "dark",
  setMode: () => undefined,
});

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { settings } = SettingsAPI.useSettings();

  const [mode, setModeState] = useState<ThemeMode>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemPreference = (event?: MediaQueryListEvent) => {
      setSystemPrefersDark(event ? event.matches : mediaQuery.matches);
    };

    updateSystemPreference();
    mediaQuery.addEventListener("change", updateSystemPreference);

    return () => mediaQuery.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    const storedThemeMode = localStorage.getItem(
      THEME_MODE_STORAGE_KEY,
    ) as ThemeMode | null;

    if (
      storedThemeMode === "dark" ||
      storedThemeMode === "light" ||
      storedThemeMode === "system"
    ) {
      setModeState(storedThemeMode);
    }

    setHasHydratedFromStorage(true);
  }, []);

  useEffect(() => {
    if (!user || !settings?.themeMode) {
      return;
    }

    setModeState(settings.themeMode);
  }, [settings?.themeMode, user]);

  const resolvedMode: "dark" | "light" = useMemo(() => {
    if (mode === "system") {
      return systemPrefersDark ? "dark" : "light";
    }

    return mode;
  }, [mode, systemPrefersDark]);

  useEffect(() => {
    if (!hasHydratedFromStorage) {
      return;
    }

    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
    document.documentElement.dataset.themeMode = resolvedMode;
  }, [hasHydratedFromStorage, mode, resolvedMode]);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    localStorage.setItem(THEME_MODE_STORAGE_KEY, nextMode);
  };

  const contextValue = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode,
    }),
    [mode, resolvedMode],
  );

  const activeTheme = useMemo(() => getAppTheme(resolvedMode), [resolvedMode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;

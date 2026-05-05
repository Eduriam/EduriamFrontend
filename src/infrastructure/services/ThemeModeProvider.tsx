"use client";

import { getAppTheme } from "styles/theme";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import type { ThemeMode } from "infrastructure/api/generated/models";
import { ThemeMode as ThemeModeValues } from "infrastructure/api/generated/models";
import { SettingsService } from "infrastructure/services/users/SettingsService";

import useAuth from "./AuthProvider";

const THEME_MODE_STORAGE_KEY = "themeMode";

interface ThemeModeContextType {
  mode: ThemeMode;
  resolvedMode: "dark" | "light";
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: ThemeModeValues.System,
  resolvedMode: "dark",
  setMode: () => undefined,
});

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { settings } = SettingsService.useSettings();

  const [mode, setModeState] = useState<ThemeMode>(ThemeModeValues.System);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemPreference = (event?: MediaQueryListEvent) => {
      setSystemPrefersDark(event ? event.matches : mediaQuery.matches);
    };

    updateSystemPreference();
    mediaQuery.addEventListener("change", updateSystemPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    const storedThemeMode = Number(localStorage.getItem(THEME_MODE_STORAGE_KEY));
    if (
      storedThemeMode === ThemeModeValues.System ||
      storedThemeMode === ThemeModeValues.Light ||
      storedThemeMode === ThemeModeValues.Dark
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
    if (mode === ThemeModeValues.System) {
      return systemPrefersDark ? "dark" : "light";
    }

    return mode === ThemeModeValues.Dark ? "dark" : "light";
  }, [mode, systemPrefersDark]);

  useEffect(() => {
    if (!hasHydratedFromStorage) {
      return;
    }

    localStorage.setItem(THEME_MODE_STORAGE_KEY, String(mode));
    document.documentElement.dataset.themeMode = resolvedMode;
  }, [hasHydratedFromStorage, mode, resolvedMode]);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    localStorage.setItem(THEME_MODE_STORAGE_KEY, String(nextMode));
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
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;

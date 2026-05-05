import { darkTheme, lightTheme } from "@eduriam/ui-core";

type AppTheme = typeof darkTheme;
type AppPalette = AppTheme["palette"] & {
  coin?: { main?: string };
  energy?: { main?: string };
};

function extendTheme(baseTheme: AppTheme): AppTheme {
  const palette = baseTheme.palette as AppPalette;

  return {
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      coin: {
        ...palette.coin,
        main: "#FFC850",
      },
      energy: {
        ...palette.energy,
        main: "#FFD951",
      },
    },
  };
}

export function getAppTheme(mode: "dark" | "light") {
  return extendTheme(mode === "light" ? lightTheme : darkTheme);
}

const theme = getAppTheme("dark");

export default theme;

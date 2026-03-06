import { theme as eduriamTheme } from "@eduriam/ui-core";

type EduriamTheme = typeof eduriamTheme;
type EduriamPalette = EduriamTheme["palette"];

const theme: EduriamTheme = {
  ...eduriamTheme,
  palette: {
    ...eduriamTheme.palette,
    coin: {
      ...(eduriamTheme.palette as EduriamPalette & {
        coin?: { main?: string };
      }).coin,
      main: "#FFC850",
    },
    energy: {
      ...(eduriamTheme.palette as EduriamPalette & {
        energy?: { main?: string };
      }).energy,
      main: "#FFD951",
    },
  },
};

export default theme;

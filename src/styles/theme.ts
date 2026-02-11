import { theme as eduriamTheme } from "@eduriam/ui-core";

type EduriamTheme = typeof eduriamTheme;
type EduriamPalette = EduriamTheme["palette"];

const theme: EduriamTheme = {
  ...eduriamTheme,
  palette: {
    ...eduriamTheme.palette,
    energy: {
      ...(eduriamTheme.palette as EduriamPalette & {
        energy?: { main?: string };
      }).energy,
      main: "#FFD951",
    },
  },
};

export default theme;

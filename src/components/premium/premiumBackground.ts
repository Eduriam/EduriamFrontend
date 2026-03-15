import type { PaletteMode } from "@mui/material";

const PREMIUM_BACKGROUND_GRADIENT_DESKTOP =
  "linear-gradient(165deg, rgba(255, 191, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%), linear-gradient(195deg, rgb(205, 209, 250) 0%, rgba(0, 0, 0, 0) 25%)";
const PREMIUM_BACKGROUND_GRADIENT_MOBILE =
  "linear-gradient(165deg, rgba(255, 191, 0, 0.2) 0%, rgba(0, 0, 0, 0) 30%), linear-gradient(210deg, rgb(205, 209, 250) 0%, rgba(0, 0, 0, 0) 25%)";
const PREMIUM_BACKGROUND_GRADIENT_DARK_DESKTOP =
  "linear-gradient(158deg, rgba(255, 145, 77, 0.2) 0%, rgba(255, 145, 77, 0) 42%), linear-gradient(202deg, rgba(108, 125, 255, 0.2) 0%, rgba(108, 125, 255, 0) 34%)";
const PREMIUM_BACKGROUND_GRADIENT_DARK_MOBILE =
  "linear-gradient(164deg, rgba(255, 145, 77, 0.2) 0%, rgba(255, 145, 77, 0) 42%), linear-gradient(218deg, rgba(108, 125, 255, 0.2) 0%, rgba(108, 125, 255, 0) 34%)";

export const getPremiumBackgroundGradient = (mode: PaletteMode) => ({
  xs:
    mode === "dark"
      ? PREMIUM_BACKGROUND_GRADIENT_DARK_MOBILE
      : PREMIUM_BACKGROUND_GRADIENT_MOBILE,
  md:
    mode === "dark"
      ? PREMIUM_BACKGROUND_GRADIENT_DARK_DESKTOP
      : PREMIUM_BACKGROUND_GRADIENT_DESKTOP,
});


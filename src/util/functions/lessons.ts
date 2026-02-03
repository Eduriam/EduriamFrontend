import i18next from "i18next";

import { LessonType } from "infrastructure/api/user/courses/lessons/Lessons";

type ColorType = "LIGHT" | "MAIN" | "DARK" | "BACKGROUND" | "ON_MAIN";

// Keep lesson colors aligned with the original custom MUI theme.
// These values mirror the old palette (speaking, pronunciation, vocabulary, etc.).
const lessonPalette: Record<
  LessonType,
  {
    light: string;
    main: string;
    dark: string;
    background: string;
    onMain: string;
  }
> = {
  SPEAKING: {
    light: "#fff9c4",
    main: "#F5C207",
    dark: "#c49000",
    background: "#FFF4E3",
    onMain: "#ffffff",
  },
  PRONUNCIATION: {
    light: "#FBE5C9",
    main: "#ED9526",
    dark: "#7F4C0A",
    background: "#FFEDD8",
    onMain: "#ffffff",
  },
  VOCABULARY: {
    light: "#C5F2C7",
    main: "#7DD956",
    dark: "#155D18",
    background: "#E9FFE0",
    onMain: "#ffffff",
  },
  GRAMMAR: {
    light: "#C5DCFA",
    main: "#52C3FF",
    dark: "#0A3977",
    background: "#E9F6FF",
    onMain: "#ffffff",
  },
  READING: {
    light: "#c5cae9",
    main: "#3f51b5",
    dark: "#002984",
    background: "#DFDDFF",
    onMain: "#ffffff",
  },
  LISTENING: {
    light: "#ECB9F9",
    main: "#9A0FBF",
    dark: "#4D085F",
    background: "#FAE9FF",
    onMain: "#ffffff",
  },
};

export function getLessonColor(lessonType: LessonType, colorType?: ColorType) {
  const color = lessonPalette[lessonType];

  switch (colorType) {
    case "LIGHT":
      return color.light;
    case "MAIN":
      return color.main;
    case "DARK":
      return color.dark;
    case "BACKGROUND":
      return color.background;
    case "ON_MAIN":
      return color.onMain;
    default:
      return color.main;
  }
}

export function getLessonName(lessonType: LessonType) {
  switch (lessonType) {
    case "SPEAKING":
      return i18next?.t("studying.speaking");
    case "PRONUNCIATION":
      return i18next?.t("studying.pronunciation");
    case "VOCABULARY":
      return i18next?.t("studying.vocabulary");
    case "GRAMMAR":
      return i18next?.t("studying.grammar");
    case "READING":
      return i18next?.t("studying.reading");
    case "LISTENING":
      return i18next?.t("studying.listening");
    default:
      return "";
  }
}

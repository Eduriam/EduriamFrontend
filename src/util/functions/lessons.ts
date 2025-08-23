import i18next from "i18next";

import { LessonType } from "infrastructure/api/user/courses/lessons/Lessons";

import theme from "../../styles/theme";

type ColorType = "LIGHT" | "MAIN" | "DARK" | "BACKGROUND" | "ON_MAIN";

export function getLessonColor(lessonType: LessonType, colorType?: ColorType) {
  let color;
  switch (lessonType) {
    case "SPEAKING":
      color = theme.palette.speaking;
      break;
    case "PRONUNCIATION":
      color = theme.palette.pronunciation;
      break;
    case "VOCABULARY":
      color = theme.palette.vocabulary;
      break;
    case "GRAMMAR":
      color = theme.palette.grammar;
      break;
    case "READING":
      color = theme.palette.reading;
      break;
    case "LISTENING":
      color = theme.palette.listening;
      break;
  }

  switch (colorType) {
    case "LIGHT":
      return color?.light;
    case "MAIN":
      return color?.main;
    case "DARK":
      return color?.dark;
    case "BACKGROUND":
      return color?.background;
    case "ON_MAIN":
      return color?.onMain;
    default:
      return color?.main;
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
